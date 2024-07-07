import wsIcon from "../../../assets/img/landing/footer/whatsapp-icon.webp"


const WhatsappBtn = () => {
  return (
    <a href="https://wa.me/573173253124?text=¡Hola! Me gustaría agendar un turno. 🦷😊" target='_blank' className="fixed bottom-10 lg:bottom-[70px] 2xl:bottom-[199px] right-7 lg:right-10 2xl:right-[106px] z-10">
      <img src={wsIcon} alt="Whatsapp Icon" className="w-20 hover:w-24  lg:w-20 2xl:w-[92px] duration-300" title="Contactar por Whatsapp"/>
    </a>
   

  )
}

export default WhatsappBtn