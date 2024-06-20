import { useState } from "react";
import { Card, Modal, notification, Pagination } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const YouTube = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить YouTube?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/youtubes/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`youtubes`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={get(createModal, "data._id") ? t("Update video") : t("Create video")}
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <div>
        <Container.All name="youtubes" url="/youtubes"
          params={{
            page,
            limit: 8,
          }}
        >
          {({ items, meta }) => {
            return (
              <div>
                <div className="flex justify-between">
                <Button
                  title={t("Create link")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal({ open: true, data: {} })}
                />
                {meta && meta.perPage && (
                <div className="mt-[20px] flex justify-center">
                  <Pagination
                    current={meta.currentPage}
                    pageSize={meta.perPage}
                    total={(meta.totalCount)}
                    onChange={(page: any) => {
                      setPage(page)
                      window.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: 0
                      })
                    }}
                  />
                </div>
              )}
                </div>
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 300, marginRight: 15 }}
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{(get(card, "link", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={(e) => (
                                e.stopPropagation(),
                                showCreateModal({ open: true, data: card })
                                )}
                              >
                                <Edit />
                              </div>
                              <div
                                  className="deleteBtn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteHandler(get(card, "_id", ""));
                                }}
                              >
                                <Delete />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default YouTube;