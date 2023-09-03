<div>
    <div class="absolute inset-0 -bottom-2" style="background: {{ $background }}"></div>

    <div class="section-wrapper inset flex items-center justify-center py-12 min-h-[600px]">
        <div class="pt-10 pb-24 pr-12 relative flex-1 overflow-hidden">
            <h2 class="section-title">
                <x-markdown>
                    {!! $title !!}
                </x-markdown>
            </h2>

            <h2 class="mt-4 section-subtitle">
                <x-markdown>
                    {!! $subtitle !!}
                </x-markdown>
            </h2>

            <div class="mt-8">
                @include('pier-website.buttons')
            </div>
        </div>

        <div
            class="{{ $imageCornerRadius }} rounded-4xl flex-shrink-0 self-stretch relative w-7/12 max-w-[680px] overflow-hidden bg-[--primary-color]">
            <img class="{{ $imageCornerRadius }} smix-blend-luminosity absolute w-full h-full object-cover"
                src="{{ $image }}" alt="" />
        </div>
    </div>
</div>
