/**
 * Ambient audio engine from the Elsewhere hero.
 * Everything is synthesised live with the Web Audio API: a low drone, typing by day,
 * cicadas by night. No audio files or dependencies.
 */

export interface AmbientEngine {
    setMuted(muted: boolean): void;
    setNight(isNight: boolean): void;
    dispose(): void;
}

export function createAmbientEngine(ctx: AudioContext): AmbientEngine {
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Shared low drone, present in both day and night.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.16;
    droneGain.connect(master);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.connect(droneGain);

    const droneA = ctx.createOscillator();
    droneA.type = "sine";
    droneA.frequency.value = 110;

    const droneB = ctx.createOscillator();
    droneB.type = "sine";
    droneB.frequency.value = 110 * 1.008;

    droneA.connect(filter);
    droneB.connect(filter);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    droneA.start();
    droneB.start();
    lfo.start();

    // Day and night layers.
    const dayGain = ctx.createGain();
    dayGain.gain.value = 0;
    dayGain.connect(master);

    const nightGain = ctx.createGain();
    nightGain.gain.value = 0;
    nightGain.connect(master);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearTimers = () => {
        timers.forEach(clearTimeout);
        timers.length = 0;
    };

    // Distant, muffled typing.
    const distantGain = ctx.createGain();
    distantGain.gain.value = 0.34;
    distantGain.connect(master);

    const distantFilter = ctx.createBiquadFilter();
    distantFilter.type = "lowpass";
    distantFilter.frequency.value = 1300;
    distantFilter.connect(distantGain);

    function distantKeyClick(time: number) {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = 280 + Math.random() * 160;
        osc.detune.value = (Math.random() - 0.5) * 120;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, time);
        g.gain.linearRampToValueAtTime(0.55, time + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, time + 0.13);

        osc.connect(g);
        g.connect(distantFilter);
        osc.start(time);
        osc.stop(time + 0.16);
    }

    function scheduleDistantTyping() {
        let t = 0;
        const count = 2 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            timers.push(setTimeout(() => distantKeyClick(ctx.currentTime), t));
            t += 110 + Math.random() * 170;
        }
        timers.push(setTimeout(scheduleDistantTyping, t + 700 + Math.random() * 1400));
    }

    // Irregular percussive blips for daytime typing.
    function typingBlip(time: number) {
        const osc = ctx.createOscillator();
        osc.type = "square";
        const scale = [560, 620, 680, 760, 900];
        const base = scale[Math.floor(Math.random() * scale.length)];
        osc.frequency.value = Math.random() < 0.12 ? base * 2.6 : base;
        osc.detune.value = (Math.random() - 0.5) * 500;

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, time);
        g.gain.linearRampToValueAtTime(0.45, time + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

        osc.connect(g);
        g.connect(dayGain);
        osc.start(time);
        osc.stop(time + 0.07);
    }

    function scheduleTyping() {
        let t = 0;
        const count = 3 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
            timers.push(setTimeout(() => typingBlip(ctx.currentTime), t));
            t += 90 + Math.random() * 150;
        }
        timers.push(setTimeout(scheduleTyping, t + 900 + Math.random() * 1800));
    }

    // Cicadas at night.
    function cicadaBurst() {
        const now = ctx.currentTime;
        const duration = 0.6 + Math.random() * 1.1;

        const carrier = ctx.createOscillator();
        carrier.type = "sawtooth";
        carrier.frequency.value = 4000 + Math.random() * 900;

        const band = ctx.createBiquadFilter();
        band.type = "bandpass";
        band.frequency.value = carrier.frequency.value;
        band.Q.value = 9;

        const amp = ctx.createGain();
        amp.gain.value = 0;

        const chop = ctx.createOscillator();
        chop.type = "sine";
        chop.frequency.value = 28 + Math.random() * 14;
        const chopDepth = ctx.createGain();
        chopDepth.gain.value = 0.28;
        const chopOffset = ctx.createConstantSource();
        chopOffset.offset.value = 0.28;

        chop.connect(chopDepth);
        chopDepth.connect(amp.gain);
        chopOffset.connect(amp.gain);

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, now);
        envelope.gain.linearRampToValueAtTime(0.4, now + duration * 0.25);
        envelope.gain.linearRampToValueAtTime(0, now + duration);

        carrier.connect(band);
        band.connect(amp);
        amp.connect(envelope);
        envelope.connect(nightGain);

        carrier.start(now);
        chop.start(now);
        chopOffset.start(now);
        carrier.stop(now + duration);
        chop.stop(now + duration);
        chopOffset.stop(now + duration);
    }

    function scheduleCicadas() {
        cicadaBurst();
        if (Math.random() < 0.4) {
            timers.push(setTimeout(cicadaBurst, 180 + Math.random() * 260));
        }
        timers.push(setTimeout(scheduleCicadas, 700 + Math.random() * 1600));
    }

    scheduleTyping();
    scheduleCicadas();
    scheduleDistantTyping();

    return {
        setMuted(muted) {
            master.gain.linearRampToValueAtTime(muted ? 0 : 0.55, ctx.currentTime + 0.4);
        },
        setNight(isNight) {
            const t = ctx.currentTime;
            dayGain.gain.linearRampToValueAtTime(isNight ? 0 : 1, t + 0.8);
            nightGain.gain.linearRampToValueAtTime(isNight ? 1 : 0, t + 0.8);
        },
        dispose() {
            clearTimers();
            [droneA, droneB, lfo].forEach((oscillator) => {
                try {
                    oscillator.stop();
                } catch {
                    // Already stopped.
                }
            });
            master.disconnect();
        },
    };
}
