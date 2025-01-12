import {Dialog, DialogContent} from '@/components/ui/dialog'
import { About } from '.';

interface AboutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AboutDialog({open, onOpenChange}: AboutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='bg-white lg:min-w-6xl lg:max-w-6xl md:min-w-[600px] md:max-w-[600px] sm:min-w-[400px] sm:max-w-[400px]'>
                <About />
            </DialogContent>
        </Dialog>
    )
}