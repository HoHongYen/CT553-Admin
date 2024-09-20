import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useCategories } from "@/hooks/categories/useCategories";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { useProduct } from "@/hooks/products/useProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";

import {
  addCategory,
  createDiscount,
  createVariant,
  deleteCategory,
  deleteImage,
  deleteVariant,
  updateDiscount,
  updateVariant,
  uploadImage as uploadProductImage,
} from "@/services/apiProducts";
import { uploadImage } from "@/services/apiUpload";

import {
  jumpToRelevantDiv,
  handleClickElement,
  formatSlugify,
} from "@/utils/helpers";

import { TreeSelect } from "antd";
import { HiCamera, HiPencil, HiTrash } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import ButtonText from "@/components/ui/ButtonText";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import Spinner from "@/components/ui/Spinner";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Editor from "@/components/ui/Editor";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";

import VariantTable from "@/components/products/variants/VariantTable";
import CreateVariantForm from "@/components/products/variants/CreateVariantForm";
import DiscountTable from "@/components/products/discounts/DiscountTable";
import CreateDiscountForm from "@/components/products/discounts/CreateDiscountForm";

function UpdateProduct() {
  const { product, isLoading: isLoadingProduct } = useProduct();
  const { updateProduct, isLoading: isEditing } = useUpdateProduct();

  const moveBack = useMoveBack();

  const { handleSubmit } = useForm();

  const { categories: allCategories } = useCategories();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [oldCategories, setOldCategories] = useState([]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [visible, setVisible] = useState(false);

  const isWorking = isLoadingProduct || isEditing || isUploadingImage;

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [variants, setVariants] = useState([]);
  const [oldVariants, setOldVariants] = useState([]);

  const [discounts, setDiscounts] = useState([]);

  const [overview, setOverview] = useState("");
  const [material, setMaterial] = useState("");
  const [specification, setSpecification] = useState("");
  const [instruction, setInstruction] = useState("");

  const [nameError, setNameError] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [errorThumbnailImage, setErrorThumbnailImage] = useState(null);
  const [errorViewImage, setErrorViewImage] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [variantError, setVariantError] = useState(null);
  const [overviewError, setOverviewError] = useState(null);
  const [materialError, setMaterialError] = useState(null);
  const [specificationError, setSpecificationError] = useState(null);
  const [instructionError, setInstructionError] = useState(null);

  const handleUploadProductImages = async () => {
    console.log("images", images);
    console.log("oldImages", oldImages);

    const newImageArrayIds = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.path.startsWith("blob")) {
        setIsUploadingImage(true);
        // upload new image
        const form = new FormData();
        console.log("-> new image", image);
        form.append("image", image.file);
        const res = await uploadImage(form);
        console.log("res", res.metadata.id);
        const uploadedProductImage = await uploadProductImage(product.id, {
          uploadedImageId: res.metadata.id,
        });
        console.log("uploadedProductImageId", uploadedProductImage.metadata.id);
        newImageArrayIds.push(uploadedProductImage.metadata.id);
      } else {
        console.log("image exist", image);
        newImageArrayIds.push(image.id);
      }
    }

    // delete old images
    for (let i = 0; i < oldImages.length; i++) {
      const oldImage = oldImages[i];
      if (!images.find((image) => image.path === oldImage.path)) {
        // delete image
        await deleteImage(oldImage.id);
      }
    }

    setIsUploadingImage(false);
    return newImageArrayIds;
  };

  const handleUploadThumbnailImage = async () => {
    if (thumbnailImage.id) {
      return thumbnailImage.id;
    }

    const form = new FormData();
    form.append("image", thumbnailImage.file);
    try {
      setIsUploadingImage(true);
      const res = await uploadImage(form);
      const id = res.metadata.id;
      return id;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUploadViewImage = async () => {
    if (viewImage.id) {
      return viewImage.id;
    }

    const form = new FormData();
    form.append("image", viewImage.file);
    try {
      setIsUploadingImage(true);
      const res = await uploadImage(form);
      console.log("Handle upload view image res", res);
      const id = res.metadata.id;
      return id;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  function checkIfHasNoChange() {
    if (
      name !== product?.name ||
      visible !== product?.visible ||
      thumbnailImage !== product?.thumbnailImage ||
      viewImage !== product?.viewImage ||
      overview !== product?.overview ||
      material !== product?.material ||
      specification !== product?.specification ||
      instruction !== product?.instruction
    ) {
      return false;
    }
    if (categories.length !== product?.categories.length) return false;
    if (images.length !== product?.images.length) return false;
    if (variants.length !== product?.variants.length) return false;
    if (discounts.length !== product?.productDiscount.length) return false;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i] !== product?.categories[i].id) return false;
    }
    for (let i = 0; i < images.length; i++) {
      if (images[i].path !== product?.images[i].image.path) return false;
    }
    for (let i = 0; i < variants.length; i++) {
      if (
        variants[i].size !== product?.variants[i].size ||
        variants[i].price !== product?.variants[i].price ||
        variants[i].quantity !== product?.variants[i].quantity
      ) {
        return false;
      }
    }
    for (let i = 0; i < discounts.length; i++) {
      if (
        discounts[i].discountType !== product?.discounts[i].discountType ||
        discounts[i].discountValue !== product?.discounts[i].discountValue ||
        discounts[i].startDate !== product?.discounts[i].startDate ||
        discounts[i].endDate !== product?.discounts[i].endDate
      ) {
        return false;
      }
    }
    return true;
  }

  async function onSubmit(data, e) {
    e.preventDefault();

    if (checkIfHasNoChange()) {
      toast.error("Không có thay đổi nào được thực hiện!");
      return;
    }

    if (!name) {
      setNameError("Không được bỏ trống!");
      jumpToRelevantDiv("name");
      return;
    }

    if (!categories || categories.length === 0) {
      setCategoriesError("Không được bỏ trống!");
      jumpToRelevantDiv("categories");
      return;
    }

    if (!thumbnailImage) {
      setErrorThumbnailImage("Không được bỏ trống!");
      jumpToRelevantDiv("thumbnailImage");
      return;
    }

    if (!viewImage) {
      setErrorViewImage("Không được bỏ trống!");
      jumpToRelevantDiv("viewImage");
      return;
    }

    if (images.length === 0) {
      setErrorImage("Thêm ít nhất một hình ảnh!");
      jumpToRelevantDiv("image");
      return;
    }

    if (variants.length === 0) {
      setVariantError("Thêm ít nhất một kích thước!");
      jumpToRelevantDiv("variant");
      return;
    }

    if (!overview) {
      setOverviewError("Không được bỏ trống!");
      jumpToRelevantDiv("overview");
      return;
    }

    if (!material) {
      setMaterialError("Không được bỏ trống!");
      jumpToRelevantDiv("material");
      return;
    }

    if (!specification) {
      setSpecificationError("Không được bỏ trống!");
      jumpToRelevantDiv("specification");
      return;
    }

    if (!instruction) {
      setInstructionError("Không được bỏ trống!");
      jumpToRelevantDiv("instruction");
      return;
    }

    const uploadedProductImageIds = await handleUploadProductImages();
    console.log("uploadedProductImageIds", uploadedProductImageIds);

    const uploadedThumbnailImageId = await handleUploadThumbnailImage();
    console.log("uploadedThumbnailImageId", uploadedThumbnailImageId);

    const uploadedViewImageId = await handleUploadViewImage();
    console.log("uploadedViewImageId", uploadedViewImageId);

    // update categories
    for (let i = 0; i < categories.length; i++) {
      const categoryId = categories[i];
      if (!oldCategories.includes(categoryId)) {
        // add category
        addCategory(product.id, { categoryId });
      }
    }

    for (let i = 0; i < oldCategories.length; i++) {
      const categoryId = oldCategories[i];
      if (!categories.includes(categoryId)) {
        // delete category
        deleteCategory(product.id, categoryId);
      }
    }

    // update variants
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      if (variant.id) {
        // update variant
        const updatedVariant = await updateVariant(product.id, {
          id: variant.id,
          size: variant.size,
          price: parseFloat(variant.price),
          quantity: variant.quantity,
        });
        console.log("updatedVariant", updatedVariant);
      } else {
        // create variant
        console.log(variant);
        const createdVariant = await createVariant(product.id, {
          size: variant.size,
          price: parseFloat(variant.price),
          quantity: parseInt(variant.quantity),
          productId: product.id,
        });
        console.log("createdVariant", createdVariant);
      }
    }

    // delete variants
    for (let i = 0; i < oldVariants.length; i++) {
      const oldVariant = oldVariants[i];
      if (!variants.find((variant) => variant.id === oldVariant.id)) {
        // delete variant
        deleteVariant(product.id, oldVariant.id);
      }
    }

    // update discounts
    for (let i = 0; i < discounts.length; i++) {
      const discount = discounts[i];
      console.log("discount", discounts[i]);
      if (discount.id) {
        // update discount
        console.log("updateDiscount", discount);
        const updatedDiscount = await updateDiscount(product.id, {
          id: discount.id,
          discountType: discount.discountType,
          discountValue: discount.discountValue,
          startDate: discount.startDate,
          endDate: discount.endDate,
        });
        console.log("updatedDiscount", updatedDiscount);
      } else {
        // create discount
        console.log("createDiscount", discount);
        const createdDiscount = await createDiscount(product.id, {
          discountType: discount.discountType,
          discountValue: discount.discountValue,
          startDate: discount.startDate,
          endDate: discount.endDate,
        });
        console.log("createdDiscount", createdDiscount);
      }
    }

    updateProduct(
      {
        productId: product.id,
        data: {
          name,
          slug,
          visible,
          thumbnailImageId: uploadedThumbnailImageId,
          viewImageId: uploadedViewImageId,
          overview,
          material,
          specification,
          instruction,
        },
      },
      {
        onSuccess: async (data) => {
          console.log(data);
        },
      }
    );
  }

  useEffect(() => {
    if (name) setNameError(null);
    if (categories && categories.length > 0) setCategoriesError(null);
    if (thumbnailImage) setErrorThumbnailImage(null);
    if (viewImage) setErrorViewImage(null);
    if (images.length > 0) setErrorImage(null);
    if (variants.length > 0) setVariantError(null);
    if (overview) setOverviewError(null);
    if (material) setMaterialError(null);
    if (specification) setSpecificationError(null);
    if (instruction) setInstructionError(null);
  }, [
    name,
    categories,
    thumbnailImage,
    viewImage,
    images,
    variants,
    discounts,
    overview,
    material,
    specification,
    instruction,
  ]);

  function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"

    setName(product?.name);
    setSlug(product?.slug);

    setCategories(
      product?.categories.map((category) => category.category.id) || []
    );
    setOldCategories(
      product?.categories.map((category) => category.category.id) || []
    );

    setVisible(product?.visible);

    setOverview(product?.overview);
    setMaterial(product?.material);
    setSpecification(product?.specification);
    setInstruction(product?.instruction);

    setThumbnailImage(product?.thumbnailImage);
    setViewImage(product?.viewImage);

    setImages(
      product?.images.map((image) => ({
        id: image.id,
        file: { name: image.image.filename },
        path: image.image.path,
      })) || []
    );
    setOldImages(
      product?.images.map((image) => ({
        id: image.id,
        file: { name: image.image.filename },
        path: image.image.path,
      })) || []
    );

    setVariants(product?.variants || []);
    setOldVariants(product?.variants || []);

    let productDiscount = product?.productDiscount || [];
    productDiscount = productDiscount.map((discount) => {
      return {
        id: discount.id,
        discountType: discount.discountType,
        discountValue: discount.discountValue,
        startDate: discount.startDate.slice(0, 10),
        endDate: discount.endDate.slice(0, 10),
      };
    });

    setDiscounts(productDiscount);
  }

  useEffect(() => {
    handleCancel();
  }, [product]);

  useEffect(() => {
    if (allCategories?.length > 0) {
      setCategoryOptions(
        allCategories.map((category) => {
          return {
            title: category.name,
            value: category.id,
            disabled: category.children.length !== 0,
            children: category.children.map((child) => {
              return {
                title: child.name,
                value: child.id,
              };
            }),
          };
        })
      );
    }
  }, [categories]);

  const handleAddProductImage = (e) => {
    const files = e.target.files;
    setImages((images) => [
      ...images,
      {
        file: files[0],
        path: URL.createObjectURL(files[0]),
      },
    ]);
  };

  const handleEditProductImage = (e, index) => {
    const files = e.target.files;
    setImages((images) => {
      const newImages = [...images];
      newImages[index] = {
        file: files[0],
        path: URL.createObjectURL(files[0]),
      };
      return newImages;
    });
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    setImages((images) => images.filter((_, i) => i !== index));
  };

  const handleAddThumbnailImage = (e) => {
    const files = e.target.files;
    setThumbnailImage({
      file: files[0],
      path: URL.createObjectURL(files[0]),
    });
  };

  const handleRemoveThumbnailImage = (e) => {
    e.preventDefault();
    setThumbnailImage(null);
  };

  const handleAddViewImage = (e) => {
    const files = e.target.files;
    setViewImage({
      file: files[0],
      path: URL.createObjectURL(files[0]),
    });
  };

  const handleRemoveViewImage = (e) => {
    e.preventDefault();
    setViewImage(null);
  };

  if (isLoadingProduct) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cập nhật sản phẩm</Heading>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow size="medium" label="Tên sản phẩm:" error={nameError}>
            <div id="name">
              <Input
                className="w-full"
                type="text"
                disabled={isWorking}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(formatSlugify(e.target.value));
                }}
              />
            </div>
          </FormRow>

          <FormRow size="medium" label="Slug:">
            <Input type="text" id="slug" disabled value={slug} />
          </FormRow>

          <FormRow size="medium" label="Danh mục:" error={categoriesError}>
            <div id="categories">
              <TreeSelect
                style={{ width: "100%" }}
                value={categories}
                dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
                treeData={categoryOptions}
                placeholder="Chọn danh mục"
                disabled={isWorking}
                treeDefaultExpandAll
                multiple
                onChange={(newValue) => setCategories(newValue)}
              />
            </div>
          </FormRow>

          <FormRow size="medium" label="Trạng thái">
            <div
              id="visible"
              className="flex items-center justify-between px-4"
            >
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setVisible(true)}
              >
                <div className="max-w-6">
                  {visible ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Hiển thị</span>
              </div>
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setVisible(false)}
              >
                <div className="max-w-6">
                  {!visible ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Ẩn</span>
              </div>
            </div>
          </FormRow>

          <div className="mt-10 grid grid-cols-2">
            {/* thumbnail image begin */}
            <div
              id="thumbnailImage"
              className="mt-8 flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5">
                <label className="font-[700] text-[1.5rem]">
                  Ảnh nền sản phẩm:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {errorThumbnailImage}
                </span>
              </div>
              <div className="flex justify-center items-center border w-[232px] h-[232px] rounded p-4">
                {thumbnailImage && (
                  <div className="relative ol-span-1 flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="overflow-hidden">
                      <img
                        src={thumbnailImage?.path}
                        className="transition-all duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="cursor-pointer flex gap-1 absolute top-2 right-2">
                      <HiPencil
                        className="h-8 w-8"
                        onClick={() => handleClickElement("editThumbnailImage")}
                      />
                      <HiTrash
                        className="h-8 w-8"
                        onClick={handleRemoveThumbnailImage}
                      />
                      <div className="absolute top-0 left-0 invisible">
                        <input
                          accept="image/*"
                          type="file"
                          id={"editThumbnailImage"}
                          onChange={handleAddThumbnailImage}
                          disabled={isWorking}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!thumbnailImage && (
                  <div
                    onClick={() => handleClickElement("addThumbnailImage")}
                    className="cursor-pointer relative col-span-1 w-[210px] h-[210px] flex items-center justify-center border-2 border-dashed border-slate-200"
                  >
                    <HiCamera className="h-14 w-14" />
                    <div className="absolute top-0 left-0 invisible">
                      <input
                        accept="image/*"
                        type="file"
                        id="addThumbnailImage"
                        multiple
                        onChange={handleAddThumbnailImage}
                        disabled={isWorking}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* thumbnail image end */}

            {/* view image begin */}
            <div
              id="viewImage"
              className="mt-8 flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5">
                <label className="font-[700] text-[1.5rem]">
                  Ảnh sản phẩm nền trong suốt:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {errorViewImage}
                </span>
              </div>
              <div className="flex justify-center items-center border w-[232px] h-[232px] rounded p-4">
                {viewImage && (
                  <div className="relative ol-span-1 flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="overflow-hidden">
                      <img
                        src={viewImage?.path}
                        className="transition-all duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="cursor-pointer flex gap-1 absolute top-2 right-2">
                      <HiPencil
                        className="h-8 w-8"
                        onClick={() => handleClickElement("editViewImage")}
                      />
                      <HiTrash
                        className="h-8 w-8"
                        onClick={handleRemoveViewImage}
                      />
                      <div className="absolute top-0 left-0 invisible">
                        <input
                          accept="image/*"
                          type="file"
                          id={"editViewImage"}
                          onChange={handleAddViewImage}
                          disabled={isWorking}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!viewImage && (
                  <div
                    onClick={() => handleClickElement("addViewImage")}
                    className="cursor-pointer relative col-span-1 w-[210px] h-[210px] flex items-center justify-center border-2 border-dashed border-slate-200"
                  >
                    <HiCamera className="h-14 w-14" />
                    <div className="absolute top-0 left-0 invisible">
                      <input
                        accept="image/*"
                        type="file"
                        id="addViewImage"
                        multiple
                        onChange={handleAddViewImage}
                        disabled={isWorking}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* view image end */}
          </div>

          <div
            id="image"
            className="mt-8 flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
          >
            <div className="flex gap-5">
              <label className="font-[700] text-[1.5rem]">Hình ảnh:</label>
              <span className="text-[1.4rem] text-[var(--color-red-700)]">
                {errorImage}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 border rounded p-4">
              {images.map((image, index) => (
                <div
                  key={image.path}
                  className="relative ol-span-1 flex items-center justify-center border-2 border-dashed border-slate-200"
                >
                  <div className="overflow-hidden">
                    <img
                      src={image.path}
                      className="transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="cursor-pointer flex gap-1 absolute top-2 right-2">
                    <HiPencil
                      className="h-8 w-8"
                      onClick={() =>
                        handleClickElement(`editProductImage_${index}`)
                      }
                    />
                    <HiTrash
                      className="h-8 w-8"
                      onClick={(e) => handleRemoveImage(e, index)}
                    />
                    <div className="absolute top-0 left-0 invisible">
                      <input
                        accept="image/*"
                        type="file"
                        id={`editProductImage_${index}`}
                        onChange={(e) => handleEditProductImage(e, index)}
                        disabled={isWorking}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div
                onClick={() => handleClickElement("productImages")}
                className="cursor-pointer relative col-span-1 w-[210px] h-[210px] flex items-center justify-center border-2 border-dashed border-slate-200"
              >
                <HiCamera className="h-14 w-14" />
                <div className="absolute top-0 left-0 invisible">
                  <input
                    accept="image/*"
                    type="file"
                    id="productImages"
                    multiple
                    onChange={handleAddProductImage}
                    disabled={isWorking}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* add variant begin */}
          <div
            id="variant"
            className="flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
          >
            <div className="flex gap-5">
              <label className="font-[700] text-[1.5rem]">
                Kích thước tranh:
              </label>
              <span className="text-[1.4rem] text-[var(--color-red-700)]">
                {variantError}
              </span>
            </div>
            <VariantTable variants={variants} setVariants={setVariants} />

            <div>
              <Modal>
                <Modal.Open opens="variant-form">
                  <Button>Thêm kích thước tranh</Button>
                </Modal.Open>
                <Modal.Window name="variant-form">
                  <CreateVariantForm
                    variants={variants}
                    setVariants={setVariants}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
          {/* add variant end */}

          {/* add discount begin */}
          <div
            id="discount"
            className="flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
          >
            <div className="flex gap-5">
              <label className="font-[700] text-[1.5rem]">
                Chương trình giảm giá:
              </label>
            </div>
            <DiscountTable discounts={discounts} setDiscounts={setDiscounts} />

            <div>
              <Modal>
                <Modal.Open opens="discount-form">
                  <Button>
                    <span className="mr-2">+</span>Thêm chương trình giảm giá
                  </Button>
                </Modal.Open>
                <Modal.Window name="discount-form">
                  <CreateDiscountForm
                    discounts={discounts}
                    setDiscounts={setDiscounts}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
          {/* add discount end */}

          <div className="flex flex-col gap-8">
            {/* overview begin */}
            <div
              id="overview"
              className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5 pb-5">
                <label className="font-[700] text-[1.5rem]">
                  Tổng quan sản phẩm:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {overviewError}
                </span>
              </div>
              <Editor
                data={overview}
                onChange={(event, editor) => {
                  setOverview(editor.getData());
                }}
                placeholder="Nhập thông tin tổng quan sản phẩm"
              />
            </div>
            {/* overview end */}

            {/* material begin */}
            <div
              id="material"
              className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5 pb-5">
                <label className="font-[700] text-[1.5rem]">
                  Chất liệu tranh
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {materialError}
                </span>
              </div>
              <Editor
                data={material}
                onChange={(event, editor) => {
                  setMaterial(editor.getData());
                }}
                placeholder="Nhập thông tin chất liệu tranh"
              />
            </div>
            {/* material end */}

            {/* specification begin */}
            <div
              id="specification"
              className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5 pb-5">
                <label className="font-[700] text-[1.5rem]">
                  Thông tin chi tiết:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {specificationError}
                </span>
              </div>
              <Editor
                data={specification}
                onChange={(event, editor) => {
                  setSpecification(editor.getData());
                }}
                placeholder="Nhập thông tin chi tiết sản phẩm"
              />
            </div>
            {/* specification end */}

            {/* instruction begin */}
            <div
              id="instruction"
              className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5 pb-5">
                <label className="font-[700] text-[1.5rem]">
                  Hướng dẫn vệ sinh tranh:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {instructionError}
                </span>
              </div>
              <Editor
                data={instruction}
                onChange={(event, editor) => {
                  setInstruction(editor.getData());
                }}
                placeholder="Nhập hướng dẫn vệ sinh tranh"
              />
            </div>
            {/* instruction end */}
          </div>

          <FormRow>
            <Button
              type="reset"
              variation="secondary"
              disabled={isWorking}
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button disabled={isWorking}>
              {!isWorking ? "Lưu chỉnh sửa" : <SpinnerMini />}
            </Button>
          </FormRow>
        </Form>
      </Row>
    </>
  );
}

export default UpdateProduct;
