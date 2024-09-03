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

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Thêm sản phẩm</Heading>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Tên sản phẩm" error={errors?.name?.message}>
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
          <FormRow label="Slug">
            <Input type="text" id="slug" disabled value={slug} />
          </FormRow>

          <FormRow label="Danh mục">
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

          {/* add variant begin */}
          {/* add variant end */}

          <div className="mt-8 flex flex-col gap-8">
            {/* overview begin */}
            <div className="flex flex-col gap-4">
              <label htmlFor="overview" className="font-[500]">
                Tổng quan sản phẩm
              </label>
              <Editor
                data={material}
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
                Chất liệu tranh
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
                Thông tin chi tiết
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
                Hướng dẫn vệ sinh tranh
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
