import { cn } from "@/lib/utils";
import { Button } from "../ui/button"

interface WaitingButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const WaitingButton = (props: WaitingButtonProps) => {
    return (
        <Button variant="ghost" className={cn(props.className)} disabled>
            <div className="animate-spin rounded-full h-5 w-5 border-[3px] border-t-slate-600"></div>
            {props.children}
        </Button>
    )
}