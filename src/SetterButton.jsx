import { useStoreActions } from "easy-peasy";

const SetterButton = ({ configName }) => {

    const setConfigName = useStoreActions((actions) => actions.setConfigName)

    return (
        <>
            <button
                className="setter-btn"
                id={ configName }
                onClick={() => { setConfigName(configName) }}
            >
                    {configName}
            </button>
        </>
    )
}

export default SetterButton
