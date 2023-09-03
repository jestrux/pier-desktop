@php
    if (!$banner) {
        return;
    }

    $background = $banner->background ?? '';
    $image = $banner->image;
    $title = $banner->title;
    $subtitle = $banner->subtitle;
    $buttons = collect($banner->buttons)->filter(function ($button) {
        return !$button->hidden;
    });
    $roundedCorners = $currentPierApp->settings->roundedCorners;

    $imageCornerRadius = [
        'none' => 'rounded-none',
        'regular' => 'rounded-xl',
        'full' => 'rounded-[40px]',
    ][$roundedCorners];
@endphp

<section id="banner"
    class="{{ $scrollBehavior == 'Lift' ? '-mt-16 pt-16' : '' }} {{ $scrollBehavior == 'Leave' ? 'pt-16' : '' }} relative text-[--banner-text-color]">

    @include('pier-website.banner.' . strtolower($banner->layout))
</section>
