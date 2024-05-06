import SetterButton from "./SetterButton";

const Presets = ({ configNames }) => {
  return (
    <div>
      {configNames.map((configName) => {
        return <SetterButton
          key={configName}
          configName={configName} 
        />;
      })}
    </div>
  )
}

export default Presets
