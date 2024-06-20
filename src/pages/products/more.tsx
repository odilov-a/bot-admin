import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data
  const { t, get } = useHooks()
  return (
    <>
      <div className="flex justify-between">
        <div className="w-[50%]">
          <p><b>{t("Nomi: ")}</b> {get(data, "productNameUz")}</p>
          <p><b>{t("Category: ")}</b> {get(data, "category.title")}</p>
          <p><b>{t("Price: ")}</b> {get(data, "price")}</p>
        </div>
        <div className="w-[50%]">
          <img
            className="object-cover rounded-[10px] w-[260px] h-[200px] mt-[15px]"
            src={get(data, "images[0].medium")}
          />
        </div>
      </div>
    </>
  )
}

export default More;