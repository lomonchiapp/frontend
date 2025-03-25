import {Dialog, DialogContent} from '@/components/ui/dialog'
import { About } from '.';

interface AboutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AboutDialog({open, onOpenChange}: AboutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='bg-white w-full max-w-screen-xl overflow-y-auto max-h-[90vh]'>
                <About />
            </DialogContent>
        </Dialog>
    )
}