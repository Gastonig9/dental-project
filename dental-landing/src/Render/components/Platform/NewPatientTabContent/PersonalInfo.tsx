export const PersonalInfo = () => {
  return (
    <div>
      <p className="poppins-semibold text-[19px] mb-4">Datos personales</p>
      <div className="mb-6 poppins-light text-[16px] space-y-4">
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">Nombre</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Apellido</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">DNI</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Edad</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Nacionalidad</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">Género</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Fecha De Nacimiento</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
      </div>
      <p className="poppins-semibold text-[19px] mb-4">Domicilio</p>
      <div className="poppins-light text-[16px] space-y-4">
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">Calle</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Número</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">Piso</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Dpto</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">localidad</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
        <div className="flex space-x-9">
          <div className="flex flex-col">
            <label htmlFor="">Establecimiento</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Obra social</label>
            <input type="text" className="personalInfo-input-style"/>
          </div>
        </div>
      </div>
    </div>
  );
};
