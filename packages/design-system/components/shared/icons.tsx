import { 
    type LucideIcon, 
    MoonIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsUpDownIcon,
    ChevronsRightLeftIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowRightLeftIcon,
    ArrowUpDownIcon,
    XIcon,
    MenuIcon,
    TrashIcon,
    Trash2Icon,
    SearchIcon,
    User2Icon,
    PlusIcon,
    OctagonXIcon,
    SunMediumIcon,
    CheckIcon,
    PhoneIcon,
    MailIcon,
    PencilIcon,
    FileVideo2Icon,
    FileImageIcon,
    FileAudio2Icon,
    BookIcon,
    UploadIcon,
    DownloadIcon,
    CircleIcon,
    Loader2Icon,
} from 'lucide-react';

import { cn } from '../../lib/utils';

export type AppIcon = LucideIcon;

// This is a temporary logo icon until we get the official one created
function LogoIcon({ className }: { className?: string}) {
    return <span className={cn(className)}>O</span>
}

export const Icons = {
    /**
     * Main Opus Logo
     */
    logo: LogoIcon,

    // Chevrons
    chevronLeft: ChevronLeftIcon,
    chevronRight: ChevronRightIcon,
    chevronUp: ChevronUpIcon,
    chevronDown: ChevronDownIcon,
    chevronUpDown: ChevronsUpDownIcon,
    chevronRightLeft: ChevronsRightLeftIcon,

    // Arrows
    arrowLeft: ArrowLeftIcon,
    arrowRight: ArrowRightIcon,
    arrowUpDown: ArrowUpDownIcon,
    arrowRightLeft:ArrowRightLeftIcon,

    // Dark Mode Icons
    sun: SunMediumIcon,
    moon: MoonIcon,

    ellipsisHorizontal: MoreHorizontalIcon,
    ellipsisVertical: MoreVerticalIcon,

    // Common
    close: XIcon,
    check: CheckIcon,
    phone: PhoneIcon, 
    mail: MailIcon,
    edit: PencilIcon,
    menu: MenuIcon,
    trash: TrashIcon,
    fullTrash: Trash2Icon,
    search: SearchIcon,
    user: User2Icon,
    add: PlusIcon,
    error: OctagonXIcon,
    upload: UploadIcon,
    download: DownloadIcon,
    loader: Loader2Icon,

    // Geniviv CMS Icons
    document: BookIcon,
    audioFile: FileAudio2Icon,
    imageFile: FileImageIcon,
    videoFile: FileVideo2Icon,

    // One-offs
    circle: CircleIcon,
};