import { useHooks } from "hooks";
import { helpers } from "services";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data
  const { t, get } = useHooks()
  return (
    <>
    <div className="flex justify-between mt-[20px]">
      <div className="w-full">
        <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Sarlavha")}:</b></p><p>{data.title}</p></div>
        <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Haqida")}:</b></p><p>{data.description}</p></div>
        <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Turi")}:</b></p><p>{t(helpers.getProductType(data.type))}</p></div>
      </div>
    </div>
    <div className="flex">
      <img className="object-cover rounded-[10px] w-[260px] h-[200px]" src={get(data, "image[0].medium")} />
      <img className="object-cover rounded-[10px] w-[260px] h-[200px]" src={get(data, "image02[0].medium")} />
      <img className="object-cover rounded-[10px] w-[260px] h-[200px]" src={get(data, "image03[0].medium")} />
    </div>
    </>
  )
}

export default More;