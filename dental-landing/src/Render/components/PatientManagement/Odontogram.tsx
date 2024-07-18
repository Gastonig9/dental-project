import { useEffect } from "react";
import { OdontogramType } from "../../../types/dtos/Patient/NewPatient.type";
import "./Odontogram.css";

//set component props
interface OdontogramProps {
  odontogramData: OdontogramType[];
}

const Odontogram: React.FC<OdontogramProps> = ({ odontogramData }) => {
  // Log odontogram data on change
  useEffect(() => {
    console.log("Got OdontogramData: ", odontogramData);
  }, [odontogramData]);

  // Func to set a color based on the ref
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

  // Func to render a tooth with its parts
  const renderTooth = (number: number) => {
    const positions = ["top", "right", "bottom", "left", "center"];
    const reversedOdontogramData = [...odontogramData].reverse();
    const toothDetails = positions.map((position) => ({
      position,
      detail: reversedOdontogramData.find(
        (detail) =>
          detail.toothNumber === number && detail.parts.includes(position)
      ),
    }));

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
            {toothDetails.map(({ position, detail }) => {
              const fillColor = detail ? getFillColor(detail.ref) : "#F5F5F5";
              switch (position) {
                case "top":
                  return (
                    <path
                      key={position}
                      d="M42.8233 0.499993L33.3665 10.307L10.6335 10.307L1.17674 0.49999L42.8233 0.499993Z"
                      fill={fillColor}
                      stroke="black"
                    />
                  );
                case "right":
                  return (
                    <path
                      key={position}
                      d="M43.5004 42.8233L33.6934 33.3665L33.6934 10.6335L43.5004 1.17673L43.5004 42.8233Z"
                      fill={fillColor}
                      stroke="black"
                    />
                  );
                case "bottom":
                  return (
                    <path
                      key={position}
                      d="M1.17674 43.5L10.6335 33.693L33.3665 33.693L42.8233 43.5L1.17674 43.5Z"
                      fill={fillColor}
                      stroke="black"
                    />
                  );
                case "left":
                  return (
                    <path
                      key={position}
                      d="M0.499627 1.17674L10.3066 10.6335L10.3066 33.3665L0.499625 42.8233L0.499627 1.17674Z"
                      fill={fillColor}
                      stroke="black"
                    />
                  );
                case "center":
                  return (
                    <rect
                      key={position}
                      x="11"
                      y="11"
                      width="22"
                      height="22"
                      fill={fillColor}
                      stroke="black"
                    />
                  );
                default:
                  return null;
              }
            })}
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
                renderTooth(number)
              )}
            </div>
          </div>
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 48 - i).map((number) =>
                renderTooth(number)
              )}
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="quadrant-row">
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 21 + i).map((number) =>
                renderTooth(number)
              )}
            </div>
          </div>
          <div className="quadrant">
            <div className="tooth-row">
              {Array.from({ length: 8 }, (_, i) => 31 + i).map((number) =>
                renderTooth(number)
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
                  renderTooth(number)
                )}
              </div>
            </div>
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 85 - i).map((number) =>
                  renderTooth(number)
                )}
              </div>
            </div>
          </div>
          <div className="quadrant-row">
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 61 + i).map((number) =>
                  renderTooth(number)
                )}
              </div>
            </div>
            <div className="quadrant">
              <div className="tooth-row">
                {Array.from({ length: 5 }, (_, i) => 71 + i).map((number) =>
                  renderTooth(number)
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
