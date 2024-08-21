import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useCategories } from "@/hooks/categories/useCategories";
import { useDarkMode } from "@/context/DarkModeContext";
import { useUploadImage } from "@/hooks/upload/useUploadImage";
import { useDeleteImage } from "@/hooks/upload/useDeleteImage";

import slugify from "slugify";
import { HiOutlineCamera } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Select from "@/components/ui/Select";
import UploadCategories from "@/components/categories/UploadCategories";

function CreateCategoryForm({onCloseModal}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { isDarkMode } = useDarkMode();
  const { categories } = useCategories();
  const { createCategory, isLoading } = useCreateCategory();
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

    console.log(name, parentId, thumbnailImage?.id, slug);

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
      <div className="flex justify-around">
        <div className="relative w-[80px] h-[80px] lg:w-[180px] lg:h-[180px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] object-cover"
                src={thumbnailImage ? thumbnailImage.path : "/default-image.jpg"}
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
                  disabled={isLoading}
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
              disabled={isLoading}
              {...register("name", {
                required: "Không được để trống",
                onChange: (e) =>
                  setSlug(slugify(e.target.value, { lower: true })),
              })}
            />
          </FormRow>
          <FormRow label="Slug">
            <Input type="text" id="slug" disabled value={slug} />
          </FormRow>
          <FormRow label="Danh mục cha">
            <Select
              disabled={isLoading}
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
          disabled={isLoading}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button disabled={isLoading}>
          {!isLoading ? "Tạo danh mục" : <SpinnerMini />}
        </Button>
        <UploadCategories />
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
