import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBannerCategory } from "@/hooks/bannerCategories/useCreateBannerCategory";
import { useUpdateBannerCategory } from "@/hooks/bannerCategories/useUpdateBannerCategory";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Heading from "../ui/Heading";

function CreateBannerCategoryForm({ bannerCategoryToEdit = {}, onCloseModal }) {
  const { createBannerCategory, isLoading: isCreating } =
    useCreateBannerCategory();
  const { updateBannerCategory, isLoading: isUpdating } =
    useUpdateBannerCategory();

  const { id: editId, ...editValues } = bannerCategoryToEdit;
  const isEditSession = Boolean(editId);

  const [name, setName] = useState();
  const [nameError, setNameError] = useState(null);

  const { handleSubmit } = useForm();

  const isWorking = isCreating || isUpdating;

  async function onSubmit({}, e) {
    e.preventDefault();

    if (!name) {
      setNameError("Không được để trống");
      return;
    }

    if (isEditSession) {
      updateBannerCategory(
        {
          bannerCategoryId: editId,
          updatedBannerCategory: {
            name,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
      return;
    }

    createBannerCategory(
      {
        name,
      },
      {
        onSuccess: () => {
          e.target.reset();
          onCloseModal?.();
        },
      }
    );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setName("");
    onCloseModal?.();
  }

  useEffect(() => {
    if (isEditSession) {
      setName(editValues.name);
    } 
  }, []);

  useEffect(() => {
    if (name) setNameError(null);
  }, [name]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Chỉnh sửa danh mục banner" : "Thêm danh mục banner"}
        </Heading>
      </div>

      <div className="flex gap-10">
        <div>
          <FormRow label="Tên danh mục banner" error={nameError}>
            <Input
              type="text"
              id="name"
              disabled={isWorking}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              "Tạo danh mục banner"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBannerCategoryForm;
