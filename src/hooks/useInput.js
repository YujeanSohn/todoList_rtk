import {useState} from "react";

const useInput = (initValue, type) => {
    const [value, setValue] = useState(initValue);

    const limit = (type) => {
        switch (type) {
            case "title":
                setValue((prev) => prev.slice(0,15))
                alert("제목은 15자 이하로 작성해주세요");
                return;
            case "content":
                setValue((prev) => prev.slice(0,20))
                alert("내용은 20자 이하로 작성해주세요");
                return;
            case "comment":
                setValue((prev) => prev.slice(0, 50))
                alert("댓글은 50자 이하로 작성해주세요");
                return;
            default:
                break;
        }
    };

    (() => {
        if (type === "title" && value.length > 15) {
            limit(type);
        } else if (type === "content" && value.length > 20) {
            limit(type);
        } else if (type === "comment" && value.length > 50) {
            limit(type);
        }
    })()

    const onChange = (e) => setValue(e.target.value);

    const reset = () => setValue(initValue);

    return [value, onChange, reset];
};

export default useInput;
