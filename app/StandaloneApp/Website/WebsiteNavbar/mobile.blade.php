<style>
    @media only screen and (max-width: 680px) {

        #mobileNavigationMenu.open button>svg:first-of-type,
        #mobileNavigationMenu:not(.open) button>svg:last-of-type {
            display: none;
        }

        #mainNavigationMenuItems {
            transition: all 0.25s ease-out;
            transform-origin: 0 0;
        }

        #mobileNavigationMenu:not(.open) #mainNavigationMenuItems {
            opacity: 0;
            transform: scaleY(0.9);
            pointer-events: none;
        }

        #mainNavigationMenuItems>* {
            transition: opacity 0.2s ease-out 0.1s;
        }

        #mobileNavigationMenu:not(.open) #mainNavigationMenuItems>* {
            opacity: 0;
        }
    }
</style>

<section id="mobileNavigationMenu" class="md:hidden sticky z-50 bg-white dark:bg-black text-black dark:text-white"
    style="top: -0.1px">
    <div class="relative h-14 flex items-center justify-between px-3">
        <a href="https://ipfsoftwares.com" class="flex items-center gap-3">
            <img class="max-h-7 max-w-[120px]" src="{{ $currentPierApp->icon }}" alt="" />

            @if ($showAppName)
                <span class="text-base leading-none font-medium">
                    {{ $currentPierApp->name }}
                </span>
            @endif
        </a>

        <div id="mobileNavButtons" class="flex items-center">
            <button onclick="toggleMenu()"
                class="z-10 flex items-center justify-center border dark:border-neutral-50/30 rounded-full w-8 h-8 focus:outline-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                    </path>
                </svg>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
    </div>

    <div id="mainNavigationMenuItems"
        class="fixed inset-0 top-14 py-6 border-t dark:border-neutral-50/20 bg-white dark:bg-black text-black dark:text-white flex flex-col">
        <nav role="off-canvas" class="w-full">
            <ul class="relative z-50 flex flex-col items-center h-full">
                @foreach ($links as $link)
                    @php
                        $page = isset($link->page) ? $link->page : null;
                        $url = $page ? url("/app/{$currentPierApp->name}/{$link->page}") : $link->url;
                        $selected = false;
                        if (isset($currentPierAppPage) && $currentPierAppPage->name == $page) {
                            $selected = true;
                        }
                    @endphp

                    <li class="w-full h-full text-center">
                        <a href="{{ $url }}"
                            class="{{ $selected ? 'border-primary' : 'border-transparent opacity-50' }} block text-xl leading-none font-semibold h-full px-4 py-2">
                            <span class="{{ $selected ? 'text-primary' : '' }}">{{ $link->label }}</span>
                        </a>
                    </li>
                @endforeach
            </ul>

            @if ($buttons->count() > 0)
                <div class="mt-1 px-4 flex flex-col gap-3">
                    @foreach ($buttons as $button)
                        @php
                            $useAppColor = isset($button->useAppColor) ? $button->useAppColor : null;
                            switch ($button->style) {
                                case 'Filled':
                                    $styling = !$useAppColor ? 'bg-black dark:bg-white text-white dark:text-black ' : 'bg-[--primary-color] text-[--primary-text-color] ';
                                    break;

                                case 'Outline':
                                    $styling = 'relative hover:opacity-60 ';
                                    break;

                                default:
                                    $styling = '';
                                    break;
                            }

                            $cornerRadius = [
                                'none' => 'rounded-none',
                                'regular' => 'rounded-md',
                                'full' => 'rounded-full',
                            ][$roundedCorners];

                            $styling .= "$cornerRadius ";
                        @endphp

                        <a href="#"
                            class="{{ $styling }} flex items-center justify-center h-11 px-3 font-medium text-center">
                            @if ($button->style == 'Outline')
                                <span
                                    class="{{ $cornerRadius }} absolute inset-0 opacity-30 border border-current"></span>
                            @endif
                            {{ $button->label }}
                        </a>
                    @endforeach
                </div>
            @endif
        </nav>
    </div>
</section>
