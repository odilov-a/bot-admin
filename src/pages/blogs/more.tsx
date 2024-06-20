import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data
  const { t, get } = useHooks()
  return (
    <div className="flex justify-between mt-[20px]">
      <div className="w-[60%]">
        <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Sarlavha")}:</b></p><p>{data.title}</p></div>
        <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Haqida")}:</b></p><p>{data.description}</p></div>
      </div>
      <div className="w-[30%]">
        <img className="object-cover rounded-[10px] w-[260px] h-[200px]" src={get(data, "image[0].medium")} />
      </div>
    </div>
  )
}

export default More;