import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateBanner } from "@/hooks/banners/useCreateBanner";
import { useDarkMode } from "@/context/DarkModeContext";
import { useBanners } from "@/hooks/banners/useBanners";
import { uploadImage } from "@/services/apiUpload";
import { useUpdateBanner } from "@/hooks/banners/useUpdateBanner";

import { HiOutlineCamera } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Heading from "../ui/Heading";
import TickRoundIcon from "../icons/TickRoundIcon";
import EmptyRoundBoxIcon from "../icons/EmptyRoundBoxIcon";
import { useBannerCategories } from "@/hooks/bannerCategories/useBannerCategories";
import Select from "../ui/Select";
import { handleClickElement } from "@/utils/helpers";

function CreateBannerForm({ bannerToEdit = {}, onCloseModal }) {
  const { totalBanners } = useBanners();
  const { bannerCategories } = useBannerCategories();
  const { createBanner, isLoading: isCreating } = useCreateBanner();
  const { updateBanner, isLoading: isUpdating } = useUpdateBanner();

  const { id: editId, ...editValues } = bannerToEdit;
  const isEditSession = Boolean(editId);

  const [name, setName] = useState();
  const [priority, setPriority] = useState();
  const [visible, setVisible] = useState(true);
  const [image, setImage] = useState();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [bannerCategoryId, setBannerCategoryId] = useState();
  const [options, setOptions] = useState([{ value: null, label: "Không có" }]);
  const [nameError, setNameError] = useState(null);
  const [bannerCategoryError, setBannerCategoryError] = useState(null);
  const [priorityError, setPriorityError] = useState(null);
  const [errorImage, setErrorImage] = useState(null);

  const { handleSubmit } = useForm();

  const { isDarkMode } = useDarkMode();

  const isWorking = isCreating || isUpdating || isUploadingImage;

  const handleUploadImage = async () => {
    if (image.id) {
      return image.id;
    }

    const form = new FormData();
    form.append("image", image.file);
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

  const handleAddImage = (e) => {
    const files = e.target.files;
    setImage({
      file: files[0],
      path: URL.createObjectURL(files[0]),
    });
  };

  async function onSubmit({}, e) {
    e.preventDefault();

    if (!name) {
      setNameError("Không được để trống");
      return;
    }

    if (!bannerCategoryId) {
      setBannerCategoryError("Hãy chọn danh mục");
      return;
    }

    if (!priority) {
      setPriorityError("Không được để trống");
      return;
    }

    if (!image) {
      setErrorImage("Hãy chọn ảnh");
      return;
    }

    const uploadedImageId = await handleUploadImage();
    console.log("uploadedImageId", uploadedImageId);

    if (isEditSession) {
      updateBanner(
        {
          bannerId: editId,
          updatedBanner: {
            name,
            priority,
            visible,
            imageId: uploadedImageId,
            bannerCategoryId,
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

    createBanner(
      {
        name,
        priority,
        visible,
        imageId: uploadedImageId,
        bannerCategoryId,
      },
      {
        onSuccess: () => {
          e.target.reset();
          setImage(null);
          onCloseModal?.();
        },
      }
    );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setName("");
    setPriority(totalBanners + 1);
    setBannerCategoryId(null);
    setVisible(true);
    setImage(null);
    onCloseModal?.();
  }

  useEffect(() => {
    if (isEditSession) {
      setName(editValues.name);
      setBannerCategoryId(editValues.bannerCategoryId);
      setPriority(editValues.priority);
      setVisible(editValues.visible);
      setImage(editValues.image);
    } else {
      // handleCancel();
      setPriority(totalBanners + 1);
    }
  }, [totalBanners]);

  useEffect(() => {
    if (bannerCategories?.length > 0) {
      setOptions([
        { value: null, label: "Không có" },
        ...bannerCategories.map((bannerCategory) => {
          return {
            value: bannerCategory.id,
            label: bannerCategory.name,
          };
        }),
      ]);
    }
  }, [bannerCategories]);

  useEffect(() => {
    if (name) setNameError(null);
    if (bannerCategoryId) setBannerCategoryError(null);
    if (priority) setPriorityError(null);
    if (image) setErrorImage(null);
  }, [name, bannerCategoryId, priority, image]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Chỉnh sửa banner" : "Thêm banner"}
        </Heading>
      </div>

      <div className="flex flex-col gap-10">
        <div className="relative w-[300px] h-[100px] lg:w-[600px] lg:h-[200px]">
          <div className="flex justify-center">
            <div className="w-[300px] h-[100px] lg:w-[600px] lg:h-[200px] border border-gray-300 overflow-hidden flex items-end justify-center">
              {image ? (
                <img
                  className="w-[300px] h-[100px] lg:w-[600px] lg:h-[200px] object-cover"
                  src={image.path}
                />
              ) : (
                <div
                  onClick={() => handleClickElement("image")}
                  className="cursor-pointer flex flex-col h-full justify-center items-center"
                >
                  <img
                    className="w-[120px] h-[120px]"
                    src="/default-image.png"
                  />
                  <div>Chọn ảnh</div>
                </div>
              )}
            </div>
            <div
              className={`absolute w-6 h-6 lg:w-14 lg:h-14 left-[95%] -bottom-1 ${
                !isDarkMode ? "bg-white" : "bg-gray-600"
              } rounded-[50%] cursor-pointer`}
            >
              <FormRow>
                <FileInput
                  className="w-[36px] h-[36px] absolute opacity-0 cursor-pointer"
                  id="image"
                  accept="image/*"
                  onChange={handleAddImage}
                  disabled={isWorking}
                />
                {!isUploadingImage ? (
                  <HiOutlineCamera className="lg:w-14 lg:h-14" />
                ) : (
                  <SpinnerMini className="lg:w-18 lg:h-18" />
                )}
              </FormRow>
            </div>
          </div>
          <div className="flex mt-5 w-full justify-center text-[1.4rem] text-[var(--color-red-700)]">
            {errorImage}
          </div>
        </div>
        <div>
          <FormRow label="Tên banner" error={nameError}>
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
          <FormRow label="Danh mục" error={bannerCategoryError}>
            <Select
              className="w-full"
              disabled={isWorking}
              options={options}
              value={bannerCategoryId}
              onChange={(e) => setBannerCategoryId(e.target.value)}
            />
          </FormRow>
          <FormRow label="Thứ tự" error={priorityError}>
            <Input
              type="text"
              id="priority"
              disabled={isWorking}
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            />
          </FormRow>

          <FormRow label="Trạng thái:">
            <div
              id="visible"
              className="-mx-5 flex items-center justify-between"
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
              "Tạo banner"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBannerForm;
