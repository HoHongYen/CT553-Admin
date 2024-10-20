import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { jumpToRelevantDiv } from "@/utils/helpers";
import { useUpdateReturnPolicy } from "@/hooks/policies/returnPolicies/useUpdateReturnPolicy";
import { useReturnPolicy } from "@/hooks/policies/returnPolicies/useReturnPolicy";
import ButtonText from "@/components/ui/ButtonText";
import Form from "@/components/ui/Form";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import Editor from "@/components/ui/Editor";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";
import FormRow from "@/components/ui/FormRow";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Spinner from "@/components/ui/Spinner";

function UpdateReturnPolicy() {
  const moveBack = useMoveBack();
  const { handleSubmit } = useForm();
  const { isLoading: isLoadingReturnPolicy, returnPolicy } = useReturnPolicy();
  const { isLoading: isUpdating, updatePolicy } = useUpdateReturnPolicy();

  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(true);
  const [contentError, setContentError] = useState(null);

  async function onSubmit({}, e) {
    e.preventDefault();

    if (!content) {
      setContentError("Không được bỏ trống!");
      jumpToRelevantDiv("content");
      return;
    }

    updatePolicy({ policyId: returnPolicy.id, data: { content, visible } });
  }

  useEffect(() => {
    if (content) setContentError(null);
  }, [content]);

  useEffect(() => {
    handleCancel();
  }, [returnPolicy]);

  async function handleCancel() {
    setContent(returnPolicy?.content);
    setVisible(returnPolicy?.visible);
  }

  if (isLoadingReturnPolicy) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cập nhật chính sách đổi trả</Heading>
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            id="content"
            className="py-[1.2rem] border-b border-[var(--color-grey-100)]"
          >
            <div className="flex gap-5 pb-5">
              <label className="font-[700] text-[1.5rem]">
                Nội dung chính sách
              </label>
              <span className="text-[1.4rem] text-[var(--color-red-700)]">
                {contentError}
              </span>
            </div>
            <Editor
              data={content}
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              placeholder="Nhập nội dung chính sách"
            />
          </div>
          <FormRow size="medium" label="Trạng thái">
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
          <FormRow>
            <Button
              type="reset"
              variation="secondary"
              disabled={isUpdating}
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button disabled={isUpdating}>
              {!isUpdating ? "Lưu chính sách" : <SpinnerMini />}
            </Button>
          </FormRow>
        </Form>
      </Row>
    </>
  );
}

export default UpdateReturnPolicy;
