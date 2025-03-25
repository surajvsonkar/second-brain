export interface ButtonProps {
    variants: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: ()=> void;
}

export const Button = (props: ButtonProps) => {
    return <button className={`${ButtonVariants[props.variants]} ${defaultStyles} ${sizeStyles[props.size]}`} >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text}
    </button>
}


export const ButtonVariants = {
            primary: "bg-purple-600 text-white",
            secondary: "bg-purple-300 text-purple-600"

};

const defaultStyles = "rounded-md p-4 flex";

const sizeStyles = {    
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-3 px-6"
};

<Button variants="primary" size="md" onClick={()=> {}} text="asd" endIcon={"afs"} startIcon={"dd"}/>

