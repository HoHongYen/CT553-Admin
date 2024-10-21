import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateUser } from "@/hooks/users/useCreateUser";
import { useDarkMode } from "@/context/DarkModeContext";
import { useUploadImage } from "@/hooks/upload/useUploadImage";
import { useDeleteImage } from "@/hooks/upload/useDeleteImage";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";

import { HiOutlineCamera } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Select from "@/components/ui/Select";
import Heading from "@/components/ui/Heading";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const { createUser, isLoading: isCreating } = useCreateUser();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isUpdating;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isDarkMode } = useDarkMode();
  const { uploadImage } = useUploadImage();
  const { deleteImage } = useDeleteImage();

  const [avatar, setAvatar] = useState(null);
  const [roleId, setRoleId] = useState(2);
  const [showPassword, setShowPassword] = useState(false);

  const [isMale, setIsMale] = useState(true);
  const [active, setActive] = useState(true);

  const images = {
    eyeOn:
      "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png",
    eyeOff:
      "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png",
  };

  const options = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Nhân viên" },
    { value: 3, label: "Khách hàng" },
  ];
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  async function handleUploadImage(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    setIsUploadingImage(true);
    uploadImage(form, {
      onSuccess: (res) => {
        setAvatar(res.metadata);
        setIsUploadingImage(false);
      },
    });
  }

  async function onSubmit({ fullName, email, password, phone, birthday }, e) {
    e.preventDefault();

    if (isEditSession)
      updateUser(
        {
          userId: +editId,
          data: {
            fullName,
            gender: isMale,
            phone,
            birthday: birthday ? new Date(birthday).toISOString() : null,
            roleId: roleId ? +roleId : 2,
            avatarId: avatar ? +avatar.id : null,
            active,
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
      createUser(
        {
          fullName,
          email,
          password,
          gender: isMale,
          phone,
          birthday: birthday ? new Date(birthday).toISOString() : null,
          roleId: roleId ? +roleId : 2,
          avatarId: avatar?.id,
          active,
        },
        {
          onSuccess: () => {
            e.target.reset();
            setRoleId(2);
            setActive(true);
            setAvatar(null);
            onCloseModal?.();
          },
        }
      );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setRoleId(2);
    setActive(true);
    if (avatar) {
      deleteImage(avatar?.id, {
        onSuccess: () => {
          setAvatar(null);
        },
      });
    }
    onCloseModal?.();
  }

  useEffect(() => {
    if (isEditSession) {
      setAvatar(editValues.thumbnailImage);
      setActive(editValues.active);
      setRoleId(editValues.roleId);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        </Heading>
      </div>

      <div className="flex gap-10">
        <div className="relative w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] object-cover"
                src={avatar ? avatar.path : "/default-image.png"}
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
          <FormRow
            label="Họ tên"
            required={true}
            error={errors?.name?.fullName}
          >
            <Input
              type="text"
              id="fullName"
              disabled={isWorking}
              {...register("fullName", {
                required: "Không được để trống",
              })}
            />
          </FormRow>

          <FormRow label="Vai trò" required={true}>
            <Select
              // className="w-full"
              disabled={isWorking}
              options={options}
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            />
          </FormRow>

          <FormRow label="Email" required={true} error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              disabled={isWorking || isEditSession}
              {...register("email", {
                required: "Không được để trống",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Nhập đúng định dạng email",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Mật khẩu (tối thiểu 8 ký tự)"
            required={true}
            error={errors?.password?.message}
          >
            <div id="password" className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                disabled={isWorking || isEditSession}
                {...register("password", {
                  required: "Không được để trống",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
              />
              {/* show password begin  */}
              <div className="absolute right-3 top-[50%] translate-y-[-50%]">
                <img
                  onClick={() => setShowPassword((show) => !show)}
                  src={showPassword ? images.eyeOn : images.eyeOff}
                  className="hover:cursor-pointer h-8 w-8"
                />
              </div>
              {/* show password end  */}
            </div>
          </FormRow>

          <FormRow label="Giới tính" required={true}>
            <div id="gender" className="flex items-center justify-between px-4">
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setIsMale(true)}
              >
                <div className="max-w-6">
                  {isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Nam</span>
              </div>
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setIsMale(false)}
              >
                <div className="max-w-6">
                  {!isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Nữ</span>
              </div>
            </div>
          </FormRow>

          <FormRow label="Số điện thoại" error={errors?.phone?.message}>
            <Input
              type="text"
              id="phone"
              disabled={isWorking}
              {...register("phone", {
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Vui lòng nhập đúng số điện thoại",
                },
              })}
            />
          </FormRow>

          <FormRow label="Ngày sinh">
            <Input
              type="date"
              id="birthday"
              disabled={isWorking}
              {...register("birthday")}
            />
          </FormRow>

          <FormRow label="Trạng thái:">
            <div
              id="active"
              className="-mx-5 flex items-center justify-between"
            >
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setActive(true)}
              >
                <div className="max-w-6">
                  {active ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Kích hoạt</span>
              </div>
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setActive(false)}
              >
                <div className="max-w-6">
                  {!active ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Khóa</span>
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
              "Tạo người dùng"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
