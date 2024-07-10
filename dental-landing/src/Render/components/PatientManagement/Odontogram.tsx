import { usePatientContext } from "../../pages/contexts/patientContext";
import { ToothDetail } from "../../../types/dtos/Patient/NewPatient.type";
import "./Odontogram.css"; // Import the CSS file for styles

const Odontogram = () => {
  const { patientData } = usePatientContext();
  const odontograma: ToothDetail[] = JSON.parse(
    patientData?.odontograma || "[]"
  );

  const renderTooth = (number: number, position: string) => {
    const toothDetail = odontograma.find(
      (detail) => detail.toothNumber === number && detail.position === position
    );
    const getFillColor = (reference: string) => {
      switch (reference) {
        case "Prestaciones Existentes":
          return "#ff0000";
        case "Prestaciones Requeridas":
          return "#0000ff";
        case "Diente ausente o a extraer":
          return "#000000";
        case "Prótesis fija/removible":
          return "#008000";
        case "Corona":
          return "#ffd700";
        default:
          return "#F5F5F5";
      }
    };

    const fillColor = toothDetail
      ? getFillColor(toothDetail.reference)
      : "#F5F5F5";

    return (
      <div className="tooth-container" key={number}>
        <div className="tooth-number">{number}</div>
        <div className="tooth">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
          >
            <path
              d="M42.8233 0.499993L33.3665 10.307L10.6335 10.307L1.17674 0.49999L42.8233 0.499993Z"
              fill={position === "up" ? fillColor : "#F5F5F5"}
              stroke="black"
            />
            <path
              d="M43.5004 42.8233L33.6934 33.3665L33.6934 10.6335L43.5004 1.17673L43.5004 42.8233Z"
              fill={position === "right" ? fillColor : "#F5F5F5"}
              stroke="black"
            />
            <path
              d="M1.17674 43.5L10.6335 33.693L33.3665 33.693L42.8233 43.5L1.17674 43.5Z"
              fill={position === "down" ? fillColor : "#F5F5F5"}
              stroke="black"
            />
            <path
              d="M0.499627 1.17674L10.3066 10.6335L10.3066 33.3665L0.499625 42.8233L0.499627 1.17674Z"
              fill={position === "left" ? fillColor : "#F5F5F5"}
              stroke="black"
            />
            <rect
              x="11"
              y="11"
              width="22"
              height="22"
              fill={position === "center" ? fillColor : "#F5F5F5"}
              stroke="black"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="odontogram">
      <div className="odontogram-container">
        <div className="quadrant-row">
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 18 - i).map((number) =>
                renderTooth(number, "top")
              )}
            </div>
          </div>
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 21 + i).map((number) =>
                renderTooth(number, "top")
              )}
            </div>
          </div>
        </div>

        <div className="quadrant-row">
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 48 - i).map((number) =>
                renderTooth(number, "bottom")
              )}
            </div>
          </div>
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 31 + i).map((number) =>
                renderTooth(number, "bottom")
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pediatric-odontogram">
        <div className="odontogram-container">
          <div className="quadrant-row">
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 55 - i).map((number) =>
                  renderTooth(number, "top")
                )}
              </div>
            </div>
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 61 + i).map((number) =>
                  renderTooth(number, "top")
                )}
              </div>
            </div>
          </div>
          <div className="quadrant-row">
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 85 - i).map((number) =>
                  renderTooth(number, "bottom")
                )}
              </div>
            </div>
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 71 + i).map((number) =>
                  renderTooth(number, "bottom")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontogram;
