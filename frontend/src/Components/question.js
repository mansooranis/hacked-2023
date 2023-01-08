import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
export default function Question(props){
    return (
        <div className="rounded-md w-11/12 bg-slate-100 flex flex-col flex-wrap">
            <text className="ml-2 mt-2 text-left pl-3 text-sm font-light text-[#0A2647]">{props.username}</text>
            <text className="ml-5  items-start text-left pl-3 mr-5 mt-1 text-[#0A2647]">{props.question}</text>
            <text className=" items-end w-28 flex flex-row space-x-2 mb-3 ml-5 mt-2">
                <ArrowUpwardRoundedIcon className="text-[#0A2647]"/>
                <text className="text-[#0A2647]">{props.total}</text>
                <ArrowDownwardRoundedIcon className="text-[#0A2647]"/>
            </text>
        </div>
    )
}