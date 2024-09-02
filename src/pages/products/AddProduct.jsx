import Button from "@/components/ui/Button";
import ButtonText from "@/components/ui/ButtonText";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import Select from "@/components/ui/Select";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Editor from "@/components/ui/Editor";

import { useCategories } from "@/hooks/categories/useCategories";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { getChildrenCategory } from "@/services/apiCategories";
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
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [parentCategoryOptions, setParentCategoryOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [childCategoryOptions, setChildCategoryOptions] = useState([
    { value: null, label: "Không có" },
  ]);
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
    setParentCategoryId(null);
    setChildCategoryId(null);

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
      setParentCategoryOptions([
        { value: null, label: "Không có" },
        ...categories.map((category) => {
          return {
            value: category.id,
            label: category.name,
          };
        }),
      ]);
    }
  }, [categories]);

  useEffect(() => {
    async function helper(parentCategoryId) {
      const childCategories = (await getChildrenCategory(parentCategoryId))
        .metadata;

      if (childCategories?.length > 0) {
        setChildCategoryOptions([
          { value: null, label: "Không có" },
          ...childCategories.map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          }),
        ]);
      }
    }

    helper(parentCategoryId);
  }, [parentCategoryId]);

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

          <FormRow label="Danh mục cha">
            <Select
              disabled={isWorking}
              options={parentCategoryOptions}
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
            />
          </FormRow>

          <FormRow label="Danh mục con">
            <Select
              disabled={isWorking}
              options={childCategoryOptions}
              value={childCategoryId}
              onChange={(e) => setChildCategoryId(e.target.value)}
            />
          </FormRow>

          {/* add variant begin */}
          {/* add variant end */}

          {/* overview begin */}
          <Editor
            data={overview}
            onChange={(event, editor) => {
              setOverview(editor.getData());
            }}
            placeholder="Nhập thông tin tổng quan"
          />
          {JSON.stringify(overview)}
          {/* overview begin */}

          {/* material begin */}
          <Editor
            data={material}
            onChange={(event, editor) => {
              setMaterial(editor.getData());
            }}
            placeholder="Nhập thông tin chất liệu tranh"
          />
          {JSON.stringify(material)}
          {/* material end */}

          {/* specification begin */}
          <Editor
            data={specification}
            onChange={(event, editor) => {
              setSpecification(editor.getData());
            }}
            placeholder="Nhập thông tin chi tiết sản phẩm"
          />
          {JSON.stringify(specification)}
          {/* specification end */}

          {/* instruction begin */}
          <Editor
            data={instruction}
            onChange={(event, editor) => {
              setInstruction(editor.getData());
            }}
            placeholder="Nhập hướng dẫn vệ sinh tranh"
          />
          {JSON.stringify(instruction)}
          {/* instruction end */}

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
