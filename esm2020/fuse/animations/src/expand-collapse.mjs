import { animate, state, style, transition, trigger } from '@angular/animations';
import { FuseAnimationCurves, FuseAnimationDurations } from './defaults';
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
export { expandCollapse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWNvbGxhcHNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RyZWFtc3RlY2gvdWktc2RrL2Z1c2UvYW5pbWF0aW9ucy9zcmMvZXhwYW5kLWNvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXpFLHdHQUF3RztBQUN4RyxzQkFBc0I7QUFDdEIsd0dBQXdHO0FBQ3hHLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDM0M7SUFDSSxLQUFLLENBQUMsaUJBQWlCLEVBQ25CLEtBQUssQ0FBQztRQUNGLE1BQU0sRUFBRSxHQUFHO0tBQ2QsQ0FBQyxDQUNMO0lBRUQsS0FBSyxDQUFDLGFBQWEsRUFDZixLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2I7SUFFRCwrQ0FBK0M7SUFDL0MsVUFBVSxDQUFDLHlEQUF5RCxFQUFFLEVBQUUsQ0FBQztJQUV6RSxhQUFhO0lBQ2IsVUFBVSxDQUFDLG9DQUFvQyxFQUMzQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQ3RCO1FBQ0ksTUFBTSxFQUFFO1lBQ0osT0FBTyxFQUFFLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLFlBQVksRUFBRTtTQUNwRjtLQUNKLENBQ0o7Q0FDSixDQUNKLENBQUM7QUFFRixPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgRnVzZUFuaW1hdGlvbkN1cnZlcywgRnVzZUFuaW1hdGlvbkR1cmF0aW9ucyB9IGZyb20gJy4vZGVmYXVsdHMnO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQCBFeHBhbmQgLyBjb2xsYXBzZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBleHBhbmRDb2xsYXBzZSA9IHRyaWdnZXIoJ2V4cGFuZENvbGxhcHNlJyxcclxuICAgIFtcclxuICAgICAgICBzdGF0ZSgndm9pZCwgY29sbGFwc2VkJyxcclxuICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApLFxyXG5cclxuICAgICAgICBzdGF0ZSgnKiwgZXhwYW5kZWQnLFxyXG4gICAgICAgICAgICBzdHlsZSgnKicpXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCB0aGUgdHJhbnNpdGlvbiBpZiB0aGUgc3RhdGUgaXMgZmFsc2VcclxuICAgICAgICB0cmFuc2l0aW9uKCd2b2lkIDw9PiBmYWxzZSwgY29sbGFwc2VkIDw9PiBmYWxzZSwgZXhwYW5kZWQgPD0+IGZhbHNlJywgW10pLFxyXG5cclxuICAgICAgICAvLyBUcmFuc2l0aW9uXHJcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA8PT4gKiwgY29sbGFwc2VkIDw9PiBleHBhbmRlZCcsXHJcbiAgICAgICAgICAgIGFuaW1hdGUoJ3t7dGltaW5nc319JyksXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWluZ3M6IGAke0Z1c2VBbmltYXRpb25EdXJhdGlvbnMuZW50ZXJpbmd9ICR7RnVzZUFuaW1hdGlvbkN1cnZlcy5kZWNlbGVyYXRpb259YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgXVxyXG4pO1xyXG5cclxuZXhwb3J0IHsgZXhwYW5kQ29sbGFwc2UgfTtcclxuIl19