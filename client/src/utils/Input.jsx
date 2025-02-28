export default function Input({labelName ,id , placeHolder, type,style,labelStyle,inputStyle,passwordField ,onChange,name,value}) {

    return (
        <>
        <div className={`${style ? style :"grid gap-y-2 "}`}>
            <div className="flex justify-between">
            <label htmlFor={id} className={`${labelStyle ? labelStyle : "text-xl font-medium"}`}>{labelName}</label>
            {passwordField && <>
                <button className="text-blue-800 font-bold text-sm">Forgot password?</button>
            </>}
            </div>
            
            <input name={name} value={value} type={type} onChange={(e)=>onChange(e)} id={id} placeholder={placeHolder} className={`${inputStyle ? inputStyle : 'border-[1.5px] border-gray-500 h-10 rounded-sm'} border-[1.5px] border-gray-500 h-10 rounded-sm pl-2`} />
        </div>
        </>
    )
}