import {
    QuestionMarkCircleIcon,
    AdjustmentsHorizontalIcon,
    BellIcon,
    BookOpenIcon,
    CalendarIcon,
    ChatBubbleLeftIcon,
    HomeIcon,
    LightBulbIcon,
    BoltIcon,
    PlusCircleIcon,
    StarIcon,
    ArrowTrendingUpIcon,
    HeartIcon,
    CogIcon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    TagIcon,
    UserIcon,
    UserCircleIcon,
    MapIcon,
    ShoppingCartIcon,
    Bars3Icon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import {
    HeartIcon as HeartIconFilled,
    HomeIcon as HomeIconFilled,
    StarIcon as StarIconFilled,
    TagIcon as TagIconFilled,
    UserIcon as UserIconFilled,
    UserCircleIcon as UserCircleIconFilled,
} from "@heroicons/react/24/solid";

const PageIcons = {
    bell: BellIcon,
    bolt: BoltIcon,
    bulb: LightBulbIcon,
    book: BookOpenIcon,
    calendar: CalendarIcon,
    chat: ChatBubbleLeftIcon,
    help: QuestionMarkCircleIcon,
    home: HomeIcon,
    "home-filled": HomeIconFilled,
    heart: HeartIcon,
    "heart-filled": HeartIconFilled,
    map: MapIcon,
    menu: Bars3Icon,
    more: EllipsisHorizontalIcon,
    "plus-circle": PlusCircleIcon,
    search: MagnifyingGlassIcon,
    settings: CogIcon,
    "settings-alt": AdjustmentsHorizontalIcon,
    "shopping-bag": ShoppingBagIcon,
    "shopping-cart": ShoppingCartIcon,
    star: StarIcon,
    "star-filled": StarIconFilled,
    tag: TagIcon,
    "tag-filled": TagIconFilled,
    trend: ArrowTrendingUpIcon,
    user: UserIcon,
    "user-filled": UserIconFilled,
    "user-circle": UserCircleIcon,
    "user-circle-filled": UserCircleIconFilled,
};

export const pageIconChoices = Object.keys(PageIcons).filter(
    (name) => !name.includes("filled")
);

export default PageIcons;
