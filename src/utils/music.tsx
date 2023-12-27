import { useMemo } from "react";

export const Playhandle = (audioElement: React.MutableRefObject<any>, ogg_name: string) => {
    // AudioContext 생성
    const audioContext = new (window.AudioContext)();

     // 이전에 연결된 소스를 끊습니다.
    if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
        audioElement.current = null;
    }

    // 새로운 Audio 엘리먼트를 생성합니다.
    audioElement.current = new Audio('/bgms/' + ogg_name + ".ogg");
    audioElement.current.crossOrigin = 'anonymous';

    // Web Audio API 관련 설정
    const source = audioContext.createMediaElementSource(audioElement.current);
    const panner = audioContext.createPanner();
    const gainNode = audioContext.createGain();

    // PannerNode 설정
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;


    // 컴포넌트 연결
    source.connect(panner);
    panner.connect(gainNode);

    // DELAY //
    const delayMix = 0.7;
    const delayFeedback = 0.6;
    const delayTime = 0.001;

    const delayWetGainNode = audioContext.createGain();
    const delayDryGainNode = audioContext.createGain();
    const delayFeedbackNode = audioContext.createGain();
    const delayNode = audioContext.createDelay(delayTime);

    // Dry 소스 노드 연결
    gainNode.connect(delayDryGainNode);
    delayDryGainNode.connect(audioContext.destination);
    delayDryGainNode.gain.value = 1 - delayMix;

    // Delay 루프 생성
    delayNode.connect(delayFeedbackNode);
    delayFeedbackNode.connect(delayNode);
    delayFeedbackNode.gain.value = delayFeedback;

    // Wet 소스 노드 연결
    gainNode.connect(delayNode);
    delayNode.connect(delayWetGainNode);
    delayWetGainNode.connect(audioContext.destination);
    delayWetGainNode.gain.value = delayMix;

    // REVERB //
    const reverbMix = 0.8;
    const reverbTime = 0.25;
    const reverbDecay = 0.1;

    const reverbWetGainNode = audioContext.createGain();
    const reverbDryGainNode = audioContext.createGain();
    const reverbNode = audioContext.createConvolver();

    // Dry 소스 노드 연결
    delayWetGainNode.connect(reverbDryGainNode);
    reverbDryGainNode.connect(audioContext.destination);
    reverbDryGainNode.gain.value = 1 - reverbMix;

    // IR을 생성하여 Convolver의 오디오 버퍼에 입력해준다.
    const sampleRate = audioContext.sampleRate;
    const length = sampleRate * reverbTime;
    const impulse = audioContext.createBuffer(2, length, sampleRate);

    const leftImpulse = impulse.getChannelData(0);
    const rightImpulse = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
        leftImpulse[i] =
            (Math.random() * 2 - 1) * Math.pow(1 - i / length, reverbDecay);
        rightImpulse[i] =
            (Math.random() * 2 - 1) * Math.pow(1 - i / length, reverbDecay);
    }

    reverbNode.buffer = impulse;

    // Wet 소스 노드 연결
    delayWetGainNode.connect(reverbNode);
    reverbNode.connect(reverbWetGainNode);
    reverbWetGainNode.connect(audioContext.destination);
    reverbWetGainNode.gain.value = reverbMix;

    // COMPRESSOR //
    const threshold = -12;
    const attack = 0.003;
    const release = 0.25;
    const ratio = 12;
    const knee = 30;

    const compressorNode = audioContext.createDynamicsCompressor();
    compressorNode.threshold.setValueAtTime(
        threshold,
        audioContext.currentTime
    );
    compressorNode.attack.setValueAtTime(attack, audioContext.currentTime);
    compressorNode.release.setValueAtTime(release, audioContext.currentTime);
    compressorNode.ratio.setValueAtTime(ratio, audioContext.currentTime);
    compressorNode.knee.setValueAtTime(knee, audioContext.currentTime);

    // Connect the compressor to the output
    gainNode.connect(compressorNode);
    compressorNode.connect(audioContext.destination);

    // 오디오 파일 설정
    audioElement.current.load();
    // audioElement.current.currentTime = 87.200;
    audioElement.current.oncanplaythrough = function () {
        
        audioElement.current.play();
    };
    return audioContext

    
}

export const handleSTOP = (audioElement: React.MutableRefObject<any>) => {
    if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.onpause = () => {
            // 노래가 멈추면서 currentTime을 그대로 유지
        };
    }
};

export const handlePlay = (audioElement: React.MutableRefObject<any>) => {
    if (audioElement.current) {
        audioElement.current.play();
    }
};