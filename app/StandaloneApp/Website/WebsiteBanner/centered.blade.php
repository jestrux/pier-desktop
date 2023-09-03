<div>
    <div class="absolute inset-0 h-4/6" style="background: {{ $background }}"></div>

    <div class="flex flex-col items-center text-center max-w-5xl mx-auto py-24 relative">
        <h2 class="section-title">
            <x-markdown>
                {!! $title !!}
            </x-markdown>
        </h2>

        <div class="mt-4 section-subtitle">
            <x-markdown>
                {!! $subtitle !!}
            </x-markdown>
        </div>

        <div class="mt-8">
            @include('pier-website.buttons')
        </div>
    </div>

    <div class="{{ $imageCornerRadius }} aspect-video relative -mt-6 max-w-5xl mx-auto overflow-hidden"
        style="background: {{ $background }}">
        <img class="{{ $imageCornerRadius }} smix-blend-luminosity absolute stop-0 left-0 w-full h-full object-cover"
            src="{{ $image }}" alt="" />
    </div>
</div>
