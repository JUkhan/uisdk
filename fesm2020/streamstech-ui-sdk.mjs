import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';

class FuseAnimationCurves {
}
FuseAnimationCurves.standard = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
FuseAnimationCurves.deceleration = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
FuseAnimationCurves.acceleration = 'cubic-bezier(0.4, 0.0, 1, 1)';
FuseAnimationCurves.sharp = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
class FuseAnimationDurations {
}
FuseAnimationDurations.complex = '375ms';
FuseAnimationDurations.entering = '225ms';
FuseAnimationDurations.exiting = '195ms';

// -----------------------------------------------------------------------------------------------------
// @ Expand / collapse
// -----------------------------------------------------------------------------------------------------
const expandCollapse = trigger('expandCollapse', [
    state('void, collapsed', style({
        height: '0'
    })),
    state('*, expanded', style('*')),
    // Prevent the transition if the state is false
    transition('void <=> false, collapsed <=> false, expanded <=> false', []),
    // Transition
    transition('void <=> *, collapsed <=> expanded', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Fade in
// -----------------------------------------------------------------------------------------------------
const fadeIn = trigger('fadeIn', [
    state('void', style({
        opacity: 0
    })),
    state('*', style({
        opacity: 1
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade in top
// -----------------------------------------------------------------------------------------------------
const fadeInTop = trigger('fadeInTop', [
    state('void', style({
        opacity: 0,
        transform: 'translate3d(0, -100%, 0)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade in bottom
// -----------------------------------------------------------------------------------------------------
const fadeInBottom = trigger('fadeInBottom', [
    state('void', style({
        opacity: 0,
        transform: 'translate3d(0, 100%, 0)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade in left
// -----------------------------------------------------------------------------------------------------
const fadeInLeft = trigger('fadeInLeft', [
    state('void', style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade in right
// -----------------------------------------------------------------------------------------------------
const fadeInRight = trigger('fadeInRight', [
    state('void', style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade out
// -----------------------------------------------------------------------------------------------------
const fadeOut = trigger('fadeOut', [
    state('*', style({
        opacity: 1
    })),
    state('void', style({
        opacity: 0
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade out top
// -----------------------------------------------------------------------------------------------------
const fadeOutTop = trigger('fadeOutTop', [
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'translate3d(0, -100%, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade out bottom
// -----------------------------------------------------------------------------------------------------
const fadeOutBottom = trigger('fadeOutBottom', [
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'translate3d(0, 100%, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade out left
// -----------------------------------------------------------------------------------------------------
const fadeOutLeft = trigger('fadeOutLeft', [
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'translate3d(-100%, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Fade out right
// -----------------------------------------------------------------------------------------------------
const fadeOutRight = trigger('fadeOutRight', [
    state('*', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'translate3d(100%, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Shake
// -----------------------------------------------------------------------------------------------------
const shake = trigger('shake', [
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *, * => true', [
        animate('{{timings}}', keyframes([
            style({
                transform: 'translate3d(0, 0, 0)',
                offset: 0
            }),
            style({
                transform: 'translate3d(-10px, 0, 0)',
                offset: 0.1
            }),
            style({
                transform: 'translate3d(10px, 0, 0)',
                offset: 0.2
            }),
            style({
                transform: 'translate3d(-10px, 0, 0)',
                offset: 0.3
            }),
            style({
                transform: 'translate3d(10px, 0, 0)',
                offset: 0.4
            }),
            style({
                transform: 'translate3d(-10px, 0, 0)',
                offset: 0.5
            }),
            style({
                transform: 'translate3d(10px, 0, 0)',
                offset: 0.6
            }),
            style({
                transform: 'translate3d(-10px, 0, 0)',
                offset: 0.7
            }),
            style({
                transform: 'translate3d(10px, 0, 0)',
                offset: 0.8
            }),
            style({
                transform: 'translate3d(-10px, 0, 0)',
                offset: 0.9
            }),
            style({
                transform: 'translate3d(0, 0, 0)',
                offset: 1
            })
        ]))
    ], {
        params: {
            timings: '0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in top
// -----------------------------------------------------------------------------------------------------
const slideInTop = trigger('slideInTop', [
    state('void', style({
        transform: 'translate3d(0, -100%, 0)'
    })),
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide in bottom
// -----------------------------------------------------------------------------------------------------
const slideInBottom = trigger('slideInBottom', [
    state('void', style({
        transform: 'translate3d(0, 100%, 0)'
    })),
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide in left
// -----------------------------------------------------------------------------------------------------
const slideInLeft = trigger('slideInLeft', [
    state('void', style({
        transform: 'translate3d(-100%, 0, 0)'
    })),
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide in right
// -----------------------------------------------------------------------------------------------------
const slideInRight = trigger('slideInRight', [
    state('void', style({
        transform: 'translate3d(100%, 0, 0)'
    })),
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide out top
// -----------------------------------------------------------------------------------------------------
const slideOutTop = trigger('slideOutTop', [
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        transform: 'translate3d(0, -100%, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide out bottom
// -----------------------------------------------------------------------------------------------------
const slideOutBottom = trigger('slideOutBottom', [
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        transform: 'translate3d(0, 100%, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide out left
// -----------------------------------------------------------------------------------------------------
const slideOutLeft = trigger('slideOutLeft', [
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        transform: 'translate3d(-100%, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Slide out right
// -----------------------------------------------------------------------------------------------------
const slideOutRight = trigger('slideOutRight', [
    state('*', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state('void', style({
        transform: 'translate3d(100%, 0, 0)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Zoom in
// -----------------------------------------------------------------------------------------------------
const zoomIn = trigger('zoomIn', [
    state('void', style({
        opacity: 0,
        transform: 'scale(0.5)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    // Prevent the transition if the state is false
    transition('void => false', []),
    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.entering} ${FuseAnimationCurves.deceleration}`
        }
    })
]);
// -----------------------------------------------------------------------------------------------------
// @ Zoom out
// -----------------------------------------------------------------------------------------------------
const zoomOut = trigger('zoomOut', [
    state('*', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'scale(0.5)'
    })),
    // Prevent the transition if the state is false
    transition('false => void', []),
    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${FuseAnimationDurations.exiting} ${FuseAnimationCurves.acceleration}`
        }
    })
]);

const fuseAnimations = [
    expandCollapse,
    fadeIn, fadeInTop, fadeInBottom, fadeInLeft, fadeInRight,
    fadeOut, fadeOutTop, fadeOutBottom, fadeOutLeft, fadeOutRight,
    shake,
    slideInTop, slideInBottom, slideInLeft, slideInRight,
    slideOutTop, slideOutBottom, slideOutLeft, slideOutRight,
    zoomIn, zoomOut
];

class FuseUtilsService {
    /**
     * Constructor
     */
    constructor() {
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
     */
    get exactMatchOptions() {
        return {
            paths: 'exact',
            fragment: 'ignored',
            matrixParams: 'ignored',
            queryParams: 'exact'
        };
    }
    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
     */
    get subsetMatchOptions() {
        return {
            paths: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
            queryParams: 'subset'
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';
        for (let i = 0; i < 10; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return name;
    }
}
FuseUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FuseUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FuseUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

//export * from './alert';

/*
 * Public API Surface of ui-sdk
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FuseUtilsService, fuseAnimations };
//# sourceMappingURL=streamstech-ui-sdk.mjs.map
