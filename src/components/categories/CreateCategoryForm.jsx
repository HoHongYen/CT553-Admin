import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useCategories } from "@/hooks/categories/useCategories";
import { useDarkMode } from "@/context/DarkModeContext";
import { useUploadImage } from "@/hooks/upload/useUploadImage";
import { useDeleteImage } from "@/hooks/upload/useDeleteImage";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";

import { HiOutlineCamera } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Select from "@/components/ui/Select";
import { formatSlugify } from "@/utils/helpers";

function CreateCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { createCategory, isLoading: isCreating } = useCreateCategory();
  const { updateCategory, isLoading: isUpdating } = useUpdateCategory();
  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isUpdating;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isDarkMode } = useDarkMode();
  const { categories } = useCategories();

  const { uploadImage } = useUploadImage();
  const { deleteImage } = useDeleteImage();

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [slug, setSlug] = useState("");
  const [options, setOptions] = useState([{ value: null, label: "Không có" }]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  async function handleUploadImage(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    setIsUploadingImage(true);
    uploadImage(form, {
      onSuccess: (res) => {
        setThumbnailImage(res.metadata);
        setIsUploadingImage(false);
      },
    });
  }

  async function onSubmit({ name }, e) {
    e.preventDefault();

    if (isEditSession)
      updateCategory(
        {
          categoryId: editId,
          updatedCategory: {
            name,
            parentId: parentId ? +parentId : null,
            thumbnailImageId: thumbnailImage?.id,
            slug,
          },
        },
        {
          onSuccess: (data) => {
            console.log(data);
            onCloseModal?.();
          },
        }
      );
    else
      createCategory(
        {
          name,
          parentId: parentId ? +parentId : null,
          thumbnailImageId: thumbnailImage?.id,
          slug,
        },
        {
          onSuccess: () => {
            e.target.reset();
            setSlug("");
            setParentId(null);
            setThumbnailImage(null);
            onCloseModal?.();
          },
        }
      );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setSlug("");
    setParentId(null);
    if (thumbnailImage) {
      deleteImage(thumbnailImage?.id, {
        onSuccess: () => {
          setThumbnailImage(null);
        },
      });
    }
    onCloseModal?.();
  }

  useEffect(() => {
    if (isEditSession) {
      setThumbnailImage(editValues.thumbnailImage);
      setParentId(editValues.parentId);
      setSlug(editValues.slug);
    }
  }, []);

  useEffect(() => {
    if (categories?.length > 0) {
      setOptions([
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10">
        <div className="relative w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] object-cover"
                src={
                  thumbnailImage ? thumbnailImage.path : "/default-image.png"
                }
              />
            </div>
            <div
              className={`absolute w-6 h-6 lg:w-14 lg:h-14 left-[65%] bottom-0 ${
                !isDarkMode ? "bg-white" : "bg-gray-600"
              } rounded-[50%] cursor-pointer`}
            >
              <FormRow>
                <FileInput
                  className="w-[36px] h-[36px] absolute opacity-0 cursor-pointer"
                  id="thumbImage"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={isWorking}
                />
                {!isUploadingImage ? (
                  <HiOutlineCamera className="lg:w-14 lg:h-14" />
                ) : (
                  <SpinnerMini className="lg:w-16 lg:h-16" />
                )}
              </FormRow>
            </div>
          </div>
        </div>
        <div>
          <FormRow label="Tên danh mục" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", {
                required: "Không được để trống",
                onChange: (e) => setSlug(formatSlugify(e.target.value)),
              })}
            />
          </FormRow>
          <FormRow label="Slug">
            <Input type="text" id="slug" disabled value={slug} />
          </FormRow>
          <FormRow label="Danh mục cha">
            <Select
              disabled={isWorking}
              options={options}
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
          </FormRow>
        </div>
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
              "Tạo danh mục"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
