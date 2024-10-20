import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateShopInfo } from "@/hooks/shopInfo/useUpdateShopInfo";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";
import { useCreateShopInfo } from "@/hooks/shopInfo/useCreateShopInfo";
import { handleClickElement, jumpToRelevantDiv } from "@/utils/helpers";
import { uploadImage } from "@/services/apiUpload";
import { getProvinces } from "@/services/apiAddresses";
import { getDistricts } from "@/services/apiAddresses";
import { getWards } from "@/services/apiAddresses";
import { HiCamera, HiPencil } from "react-icons/hi2";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import Row from "@/components/ui/Row";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";

function ShopInfo() {
  const { shopInfo, isLoading: isLoadingShopInfo } = useShopInfo();
  const { createShopInfo, isLoading: isCreating } = useCreateShopInfo();
  const { updateShopInfo, isLoading: isUpdating } = useUpdateShopInfo();
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessCode, setBusinessCode] = useState("");
  const [isMaintaining, setIsMaintaining] = useState(false);
  const [maintainingMessage, setMaintainingMessage] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const isWorking =
    isLoadingShopInfo || isCreating || isUpdating || isUploadingImage;

  const [nameError, setNameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [businessCodeError, setBusinessCodeError] = useState("");
  const [workingTimeError, setWorkingTimeError] = useState("");
  const [logoImageError, setLogoImageError] = useState("");

  const [provinceId, setProvinceId] = useState(0);
  const [provinceOptions, setProvinceOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [provinceError, setProvinceError] = useState(null);

  const [districtId, setDistrictId] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [districtError, setDistrictError] = useState(null);

  const [wardCode, setWardcode] = useState(0);
  const [wardOptions, setWardOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [wardError, setWardError] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");

  const handleUploadLogoImage = async () => {
    if (logoImage.id) {
      return logoImage.id;
    }

    const form = new FormData();
    form.append("image", logoImage.file);
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

  async function onSubmit({}, e) {
    e.preventDefault();
    if (!name) {
      setNameError("Không được bỏ trống!");
      jumpToRelevantDiv("name");
      return;
    }
    if (!fullName) {
      setFullNameError("Không được bỏ trống!");
      jumpToRelevantDiv("fullName");
      return;
    }
    if (!email) {
      setEmailError("Không được bỏ trống!");
      jumpToRelevantDiv("email");
      return;
    }
    if (!phone) {
      setPhoneError("Không được bỏ trống!");
      jumpToRelevantDiv("phone");
      return;
    }
    if (!businessCode) {
      setBusinessCodeError("Không được bỏ trống!");
      jumpToRelevantDiv("businessCode");
      return;
    }

    if (!workingTime) {
      setWorkingTimeError("Không được bỏ trống!");
      jumpToRelevantDiv("workingTime");
      return;
    }

    if (!provinceId) setProvinceError("Không được bỏ trống!");
    else setProvinceError(null);

    if (!districtId) setDistrictError("Không được bỏ trống!");
    else setDistrictError(null);

    if (!wardCode) setWardError("Không được bỏ trống!");
    else setWardError(null);

    const uploadedLogoImageId = await handleUploadLogoImage();

    if (!shopInfo) {
      createShopInfo({
        name,
        fullName,
        email,
        phone,
        businessCode,
        workingTime,
        isMaintaining,
        maintainingMessage,
        provinceId,
        districtId,
        wardCode,
        detailAddress,
        logoId: uploadedLogoImageId,
      });
      return;
    }

    updateShopInfo(
      {
        shopInfoId: shopInfo.id,
        data: {
          name,
          fullName,
          email,
          phone,
          businessCode,
          workingTime,
          isMaintaining,
          maintainingMessage,
          provinceId,
          districtId,
          wardCode,
          detailAddress,
          logoId: uploadedLogoImageId,
        },
      },
      {
        onSuccess: () => {
          handleCancel();
        },
      }
    );
  }

  useEffect(() => {
    if (name) setNameError(null);
    if (fullName) setFullNameError(null);
    if (email) setEmailError(null);
    if (phone) setPhoneError(null);
    if (businessCode) setBusinessCodeError(null);
    if (workingTime) setWorkingTimeError(null);
    if (logoImage) setLogoImageError(null);
  }, [name, fullName, email, phone, businessCode, workingTime, logoImage]);

  useEffect(() => {
    async function helper() {
      const provinces = (await getProvinces()).metadata;

      if (provinces?.length > 0) {
        setProvinceOptions([
          { value: null, label: "Không có" },
          ...provinces.map((province) => {
            return {
              value: province.ProvinceID,
              label: province.ProvinceName,
            };
          }),
        ]);
      }
    }

    helper();
  }, []);

  useEffect(() => {
    async function helper(provinceId) {
      const districts = (await getDistricts(provinceId)).metadata;

      if (districts?.length > 0) {
        setDistrictOptions([
          { value: null, label: "Không có" },
          ...districts.map((district) => {
            return {
              value: district.DistrictID,
              label: district.DistrictName,
            };
          }),
        ]);
      }
    }

    helper(provinceId);
  }, [provinceId]);

  useEffect(() => {
    async function helper(districtId) {
      const wards = (await getWards(districtId)).metadata;

      if (wards?.length > 0) {
        setWardOptions([
          { value: null, label: "Không có" },
          ...wards.map((ward) => {
            return {
              value: ward.WardCode,
              label: ward.WardName,
            };
          }),
        ]);
      }
    }

    helper(districtId);
  }, [provinceId, districtId]);

  async function handleCancel() {
    setName(shopInfo?.name);
    setFullName(shopInfo?.fullName);
    setEmail(shopInfo?.email);
    setPhone(shopInfo?.phone);
    setBusinessCode(shopInfo?.businessCode);
    setIsMaintaining(shopInfo?.isMaintaining);
    setMaintainingMessage(shopInfo?.maintainingMessage);
    setWorkingTime(shopInfo?.workingTime);
    setProvinceId(shopInfo?.provinceId);
    setDistrictId(shopInfo?.districtId);
    setWardcode(shopInfo?.wardCode);
    setDetailAddress(shopInfo?.detailAddress);
    setLogoImage(shopInfo?.logo);
  }

  useEffect(() => {
    handleCancel();
  }, [shopInfo]);

  const handleAddLogoImage = (e) => {
    const files = e.target.files;
    setLogoImage({
      file: files[0],
      path: URL.createObjectURL(files[0]),
    });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Thông tin cửa hàng</Heading>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3">
            {/* logo image begin */}
            <div id="logoImage" className="flex flex-col gap-5">
              <div className="flex gap-5">
                <label className="font-[700] text-[1.5rem]">
                  Logo cửa hàng:
                </label>
                <span className="text-[1.4rem] text-[var(--color-red-700)]">
                  {logoImageError}
                </span>
              </div>
              <div className="flex justify-center items-center border w-[232px] min-h-[232px] rounded p-4">
                {logoImage && (
                  <div className="relative ol-span-1 flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="overflow-hidden">
                      <img
                        src={logoImage?.path}
                        className="transition-all duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="cursor-pointer flex gap-1 absolute top-2 right-2">
                      <HiPencil
                        className="h-8 w-8"
                        onClick={() => handleClickElement("editLogoImage")}
                      />
                      <div className="absolute top-0 left-0 invisible">
                        <input
                          accept="image/*"
                          type="file"
                          id={"editLogoImage"}
                          onChange={handleAddLogoImage}
                          disabled={isWorking}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {!logoImage && (
                  <div
                    onClick={() => handleClickElement("addLogoImage")}
                    className="cursor-pointer relative col-span-1 w-[210px] min-h-[210px] flex items-center justify-center border-2 border-dashed border-slate-200"
                  >
                    <HiCamera className="h-14 w-14" />
                    <div className="absolute top-0 left-0 invisible">
                      <input
                        accept="image/*"
                        type="file"
                        id="addLogoImage"
                        multiple
                        onChange={handleAddLogoImage}
                        disabled={isWorking}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* logo image end */}
            <div className="col-span-2 flex flex-col justify-center ">
              <FormRow size="medium" label="Tiêu đề website:" error={nameError}>
                <div id="name">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </FormRow>

              <FormRow
                size="medium"
                label="Tên cửa hàng:"
                error={fullNameError}
              >
                <div id="fullName">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </FormRow>

              <FormRow size="medium" label="Email:" error={emailError}>
                <div id="email">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </FormRow>

              <FormRow size="medium" label="Số điện thoại:" error={phoneError}>
                <div id="phone">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </FormRow>

              <FormRow
                size="medium"
                label="Số đăng ký kinh doanh:"
                error={businessCodeError}
              >
                <div id="businessCode">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={businessCode}
                    onChange={(e) => setBusinessCode(e.target.value)}
                  />
                </div>
              </FormRow>
              <FormRow
                size="medium"
                label="Giờ làm việc:"
                error={workingTimeError}
              >
                <div id="workingTime">
                  <Input
                    className="w-full"
                    type="text"
                    disabled={isWorking}
                    value={workingTime}
                    onChange={(e) => setWorkingTime(e.target.value)}
                  />
                </div>
              </FormRow>
              <FormRow size="medium" label="Trạng thái:">
                <div
                  id="isMaintaining"
                  className="flex items-center justify-between px-4"
                >
                  <div
                    className="flex items-center gap-5 cursor-pointer"
                    onClick={() => setIsMaintaining(false)}
                  >
                    <div className="max-w-6">
                      {!isMaintaining ? (
                        <TickRoundIcon />
                      ) : (
                        <EmptyRoundBoxIcon />
                      )}
                    </div>
                    <span>Đang hoạt động</span>
                  </div>
                  <div
                    className="flex items-center gap-5 cursor-pointer"
                    onClick={() => setIsMaintaining(true)}
                  >
                    <div className="max-w-6">
                      {isMaintaining ? (
                        <TickRoundIcon />
                      ) : (
                        <EmptyRoundBoxIcon />
                      )}
                    </div>
                    <span>Đang bảo trì</span>
                  </div>
                </div>
              </FormRow>
              <FormRow size="medium" label="Thông báo bảo trì:">
                <Textarea
                  type="text"
                  id="maintainingMessage"
                  value={maintainingMessage}
                  rows={7}
                  onChange={(e) => setMaintainingMessage(e.target.value)}
                />
              </FormRow>
              <FormRow
                size="medium"
                label="Tỉnh / thành phố:"
                error={provinceError}
              >
                <Select
                  className="w-full"
                  disabled={isWorking}
                  options={provinceOptions}
                  value={provinceId}
                  onChange={(e) => setProvinceId(e.target.value)}
                />
              </FormRow>
              <FormRow
                size="medium"
                label="Quận / huyện:"
                error={districtError}
              >
                <Select
                  className="w-full"
                  disabled={isWorking}
                  options={districtOptions}
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                />
              </FormRow>
              <FormRow size="medium" label="Phường / xã:" error={wardError}>
                <Select
                  className="w-full"
                  disabled={isWorking}
                  options={wardOptions}
                  value={wardCode}
                  onChange={(e) => setWardcode(e.target.value)}
                />
              </FormRow>
              <FormRow size="medium" label="Địa chỉ cụ thể:">
                <Textarea
                  type="text"
                  id="detailAddress"
                  disabled={isWorking}
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </FormRow>
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
                  {!isWorking ? "Lưu thông tin" : <SpinnerMini />}
                </Button>
              </FormRow>
            </div>
          </div>
        </Form>
      </Row>
    </>
  );
}

export default ShopInfo;
