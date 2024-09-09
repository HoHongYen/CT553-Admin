import slugify from "slugify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCategories } from "@/hooks/categories/useCategories";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { useProduct } from "@/hooks/products/useProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";

import {
  createVariant,
  deleteImage,
  deleteVariant,
  updateVariant,
  uploadImage as uploadProductImage,
} from "@/services/apiProducts";

import { jumpToRelevantDiv, handleClickElement } from "@/utils/helpers";

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

import VariantTable from "@/components/products/VariantTable";
import CreateVariantForm from "@/components/products/CreateVariantForm";
import { uploadImage } from "@/services/apiUpload";

function UpdateProduct() {
  const { product, isLoading: isLoadingProduct } = useProduct();
  const { updateProduct, isLoading: isEditing } = useUpdateProduct();

  const moveBack = useMoveBack();

  const { register, handleSubmit, formState, setValue } = useForm();
  const { errors } = formState;

  const { categories } = useCategories();

  const [slug, setSlug] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [visible, setVisible] = useState(false);

  const isWorking = isLoadingProduct || isEditing || isUploadingImage;

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [variants, setVariants] = useState([]);
  const [oldVariants, setOldVariants] = useState([]);

  const [overview, setOverview] = useState("");
  const [material, setMaterial] = useState("");
  const [specification, setSpecification] = useState("");
  const [instruction, setInstruction] = useState("");

  const [categoryError, setCategoryError] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [variantError, setVariantError] = useState(null);
  const [overviewError, setOverviewError] = useState(null);
  const [materialError, setMaterialError] = useState(null);
  const [specificationError, setSpecificationError] = useState(null);
  const [instructionError, setInstructionError] = useState(null);

  const handleUploadProductImages = async () => {
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

  useEffect(() => {
    console.log("images", images);
  }, [images]);

  async function onSubmit({ name }, e) {
    e.preventDefault();

    if (!category) {
      setCategoryError("Không được bỏ trống!");
      jumpToRelevantDiv("category");
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

    updateProduct(
      {
        productId: product.id,
        data: {
          name,
          slug,
          categoryId: category,
          visible,
          // uploadedImageIds: uploadedProductImageIds,
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
    handleCancel();
  }, [product]);

  useEffect(() => {
    if (category) setCategoryError(null);
    if (images.length > 0) setErrorImage(null);
    if (variants.length > 0) setVariantError(null);
    if (overview) setOverviewError(null);
    if (material) setMaterialError(null);
    if (specification) setSpecificationError(null);
    if (instruction) setInstructionError(null);
  }, [
    category,
    images,
    variants,
    overview,
    material,
    specification,
    instruction,
  ]);

  function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
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

    setValue("name", product?.name);
    setSlug(product?.slug);
    setCategory(product?.categoryId);
    setVisible(product?.visible);

    setOverview(product?.overview);
    setMaterial(product?.material);
    setSpecification(product?.specification);
    setInstruction(product?.instruction);
  }

  useEffect(() => {
    if (categories?.length > 0) {
      setCategoryOptions(
        categories.map((category) => {
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

  if (isLoadingProduct) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cập nhật sản phẩm</Heading>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Tên sản phẩm:" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", {
                required: "Không được để trống",
                onChange: (e) =>
                  setSlug(
                    slugify(e.target.value, { lower: true, locale: "vi" })
                  ),
              })}
            />
          </FormRow>

          <FormRow label="Slug:">
            <Input type="text" id="slug" disabled value={slug} />
          </FormRow>

          <FormRow label="Danh mục:" error={categoryError}>
            <div id="category">
              <TreeSelect
                style={{ width: "100%" }}
                value={category}
                dropdownStyle={{ maxHeight: 500, overflow: "auto" }}
                treeData={categoryOptions}
                placeholder="Chọn danh mục"
                disabled={isWorking}
                treeDefaultExpandAll
                onChange={(newValue) => setCategory(newValue)}
              />
            </div>
          </FormRow>

          <FormRow label="Trạng thái">
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

          <div
            id="image"
            className="mt-8 flex flex-col gap-8 py-[1.2rem] border-b border-[var(--color-grey-100)]"
          >
            <div className="flex gap-5">
              <label className="font-[500]">Hình ảnh:</label>
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
              <label className="font-[500]">Kích thước tranh:</label>
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
          <div className="flex flex-col gap-8">
            {/* overview begin */}
            <div
              id="overview"
              className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
            >
              <div className="flex gap-5">
                <label className="font-[500]">Tổng quan sản phẩm:</label>
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
              <div className="flex gap-5">
                <label className="font-[500]">Chất liệu tranh</label>
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
              <div className="flex gap-5">
                <label className="font-[500]">Thông tin chi tiết:</label>
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
              <div className="flex gap-5">
                <label className="font-[500]">Hướng dẫn vệ sinh tranh:</label>
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
