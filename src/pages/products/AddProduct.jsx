import { TreeSelect } from "antd";
import Button from "@/components/ui/Button";
import ButtonText from "@/components/ui/ButtonText";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Editor from "@/components/ui/Editor";

import { useCategories } from "@/hooks/categories/useCategories";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { HiCamera, HiPencil, HiTrash } from "react-icons/hi2";

function AddProduct({ productToEdit = {} }) {
  const { createProduct, isLoading: isCreating } = useCreateProduct();
  // const { updateCategory, isLoading: isUpdating } = useUpdateCategory();
  const moveBack = useMoveBack();

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);
  // const isWorking = isCreating || isUpdating;
  const isWorking = isCreating;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { categories } = useCategories();

  const [slug, setSlug] = useState("");
  const [categoryOptions, setCategoryOptions] = useState();
  const [category, setCategory] = useState();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [images, setImages] = useState([
    {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
    },
    {
      path: "https://res.cloudinary.com/dphzvfcmy/image/upload/v1725026756/CT553/canh_hong_view_ooezqt.png",
    },
    {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/3-2.jpg",
    },
    {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/6.jpg",
    },
    {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/4.jpg",
    },
    {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/maket-3-2.jpg",
    },
  ]);

  const [overview, setOverview] = useState("");
  const [material, setMaterial] = useState("");
  const [specification, setSpecification] = useState("");
  const [instruction, setInstruction] = useState("");

  async function handleUploadImage(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    setIsUploadingImage(true);
    // uploadImage(form, {
    //   onSuccess: (res) => {
    //     setThumbnailImage(res.metadata);
    //     setIsUploadingImage(false);
    //   },
    // });
  }

  async function onSubmit({ name }, e) {
    e.preventDefault();

    // if (isEditSession)
    //   updateCategory(
    //     {
    //       categoryId: editId,
    //       updatedCategory: {
    //         name,
    //         parentId: parentId ? +parentId : null,
    //         thumbnailImageId: thumbnailImage?.id,
    //         slug,
    //       },
    //     },
    //     {
    //       onSuccess: (data) => {
    //         console.log(data);
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else

    // createCategory(
    //   {
    //     name,
    //     parentId: parentId ? +parentId : null,
    //     thumbnailImageId: thumbnailImage?.id,
    //     slug,
    //   },
    //   {
    //     onSuccess: () => {
    //       e.target.reset();
    //       setSlug("");
    //       setParentId(null);
    //       setThumbnailImage(null);
    //       onCloseModal?.();
    //     },
    //   }
    // );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setSlug("");
    setCategory(null);
    // if (thumbnailImage) {
    //   deleteImage(thumbnailImage?.id, {
    //     onSuccess: () => {
    //       setThumbnailImage(null);
    //     },
    //   });
  }

  useEffect(() => {
    if (isEditSession) {
      // setThumbnailImage(editValues.thumbnailImage);
      // setParentId(editValues.parentId);
      // setSlug(editValues.slug);
    }
  }, []);

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

  const handleClickElement = (id) => {
    document.getElementById(id).click();
  };

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

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Thêm sản phẩm</Heading>
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

          <FormRow label="Danh mục:">
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
          </FormRow>

          <div className="mt-8 flex flex-col gap-4">
            <label htmlFor="image" className="font-[500]">
              Hình ảnh:
            </label>
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
          {/* add variant end */}

          <div className="mt-8 flex flex-col gap-8">
            {/* overview begin */}
            <div className="flex flex-col gap-4">
              <label htmlFor="overview" className="font-[500]">
                Tổng quan sản phẩm:
              </label>
              <Editor
                data={overview}
                onChange={(event, editor) => {
                  setOverview(editor.getData());
                }}
                placeholder="Nhập thông tin chất liệu tranh"
              />
              {/* {JSON.stringify(overview)} */}
            </div>
            {/* overview end */}

            {/* material begin */}
            <div className="flex flex-col gap-4">
              <label htmlFor="material" className="font-[500]">
                Chất liệu tranh:
              </label>
              <Editor
                data={material}
                onChange={(event, editor) => {
                  setMaterial(editor.getData());
                }}
                placeholder="Nhập thông tin chất liệu tranh"
              />
              {/* {JSON.stringify(material)} */}
            </div>
            {/* material end */}

            {/* specification begin */}
            <div className="flex flex-col gap-4">
              <label htmlFor="specification" className="font-[500]">
                Thông tin chi tiết:
              </label>
              <Editor
                data={specification}
                onChange={(event, editor) => {
                  setSpecification(editor.getData());
                }}
                placeholder="Nhập thông tin chi tiết sản phẩm"
              />
              {/* {JSON.stringify(specification)} */}
            </div>
            {/* specification end */}

            {/* instruction begin */}
            <div className="flex flex-col gap-4">
              <label htmlFor="instruction" className="font-[500]">
                Hướng dẫn vệ sinh tranh:
              </label>
              <Editor
                data={instruction}
                onChange={(event, editor) => {
                  setInstruction(editor.getData());
                }}
                placeholder="Nhập hướng dẫn vệ sinh tranh"
              />
              {/* {JSON.stringify(instruction)} */}
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
              {!isWorking ? (
                isEditSession ? (
                  "Lưu chỉnh sửa"
                ) : (
                  "Thêm sản phẩm"
                )
              ) : (
                <SpinnerMini />
              )}
            </Button>
            {/* <UploadCategories /> */}
          </FormRow>
        </Form>
      </Row>
    </>
  );
}

export default AddProduct;
