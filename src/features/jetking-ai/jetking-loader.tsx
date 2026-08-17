import { JetkingShield } from '@/components/brand/jetking-shield';

/**
 * Full-screen branded loading screen for the Jetking AI console.
 *
 * Official Jetking shield is the hero: orbital rings, soft reactor glow,
 * mark scale-in, then wordmark + progress. Pure CSS so it works as both
 * `loading.tsx` and the client boot overlay.
 */
export function JetkingLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-canvas">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(560px 400px at 50% 44%, #ea1c2422, transparent 68%), radial-gradient(900px 600px at 50% 100%, #ea1c2410, transparent 55%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        <div className="relative grid size-44 place-items-center">
          <span className="absolute inset-0 rounded-full border border-line" />
          <span className="absolute inset-0 rounded-full border border-transparent [border-top-color:#ea1c24] [border-right-color:#ea1c2444] [animation:jk-spin_2.8s_linear_infinite]" />
          <span className="absolute inset-[14px] rounded-full border border-dashed border-jk-500/25 [animation:jk-spin_9s_linear_infinite_reverse]" />
          <span
            className="absolute inset-[28px] rounded-full [animation:jk-pulse_2.4s_ease-in-out_infinite]"
            style={{ boxShadow: '0 0 48px 4px #ea1c2433 inset, 0 0 36px #ea1c2428' }}
          />

          <span className="relative block h-[4.5rem] [animation:jk-mark-in_0.7s_var(--ease-out-soft)_both]">
            <JetkingShield id="jk-loader" />
          </span>
        </div>

        <div className="mt-9 flex flex-col items-center opacity-0 [animation:jk-rise_0.55s_ease_0.25s_forwards]">
          <p className="font-display text-[1.65rem] font-extrabold tracking-[0.2em] text-ink">
            JETKING&nbsp;AI
          </p>
          <p className="text-jk-500 mt-1.5 text-[12px] font-semibold tracking-[0.28em] uppercase">
            Better Life
          </p>
        </div>

        <div className="mt-9 h-[2px] w-52 overflow-hidden rounded-full bg-ink/10 opacity-0 [animation:jk-rise_0.45s_ease_0.4s_forwards]">
          <div className="h-full w-2/5 rounded-full bg-[linear-gradient(90deg,#ea1c24,#f97066)] [animation:jk-load_1.5s_var(--ease-out-soft)_infinite]" />
        </div>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.32em] text-ink-subtle uppercase opacity-0 [animation:jk-rise_0.45s_ease_0.5s_forwards,jk-blink_1.6s_ease-in-out_0.5s_infinite]">
          Initializing
        </p>
      </div>
    </div>
  );
}
