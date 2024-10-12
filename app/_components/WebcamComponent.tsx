"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaceLandmarker,
  FaceLandmarkerOptions,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import { Color, Euler, Matrix4 } from "three";
import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar";
import * as faceapi from "face-api.js";
import { loadFaceApiModels } from "@/app/utils/faceApi";

const defaultAvatarUrl =
  "https://models.readyplayer.me/670883a593828dcb385cad2e.glb?morphTargets=ARKit&textureAtlas=1024";

const options: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: "GPU",
  },
  numFaces: 1,
  runningMode: "VIDEO",
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

let lastVideoTime = -1;

export default function WebcamComponent({
  setIsSuccess,
}: {
  setIsSuccess: (success: boolean) => void;
}) {
  const [blendshapes, setBlendshapes] = useState<any[]>([]);
  const [rotation, setRotation] = useState<Euler | null>(null);
  const [expression, setExpression] = useState<string>("neutral");
  const [expressionScore, setExpressionScore] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [happyCount, setHappyCount] = useState(0);

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      options
    );

    const video = document.getElementById("video") as HTMLVideoElement;
    videoRef.current = video;

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", () => {
          detectFaceExpressions(video); // 표정 감지 시작
          predict(faceLandmarker); // mediapipe로 위치 및 회전 감지 시작
        });
      });
  };

  const detectFaceExpressions = async (video: HTMLVideoElement) => {
    await loadFaceApiModels();

    const detect = async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0 && detections[0].expressions) {
        const expressions = detections[0].expressions;
        const maxExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a as keyof faceapi.FaceExpressions] >
          expressions[b as keyof faceapi.FaceExpressions]
            ? a
            : b
        );

        const score =
          expressions[maxExpression as keyof faceapi.FaceExpressions];
        if (typeof score === "number") {
          setExpression(maxExpression);
          setExpressionScore(score);
          if (maxExpression === "happy" && score > 0.75) {
            setHappyCount((prev) => {
              console.log("happyCount: ", prev + 1);
              return prev + 1;
            });
          } else {
            setHappyCount(0);
            console.log("점수 초기화");
          }
        }
      }

      requestAnimationFrame(() => detect());
    };

    detect();
  };

  useEffect(() => {
    if (happyCount >= 10) {
      setIsSuccess(true);
    }
  }, [happyCount]);

  const predict = async (faceLandmarker: FaceLandmarker) => {
    let nowInMs = Date.now();
    const video = videoRef.current;

    if (video && lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(
        video,
        nowInMs
      );

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        setBlendshapes(faceLandmarkerResult.faceBlendshapes[0].categories);

        const matrix = new Matrix4().fromArray(
          faceLandmarkerResult.facialTransformationMatrixes![0].data
        );
        setRotation(new Euler().setFromRotationMatrix(matrix));
      }
    }

    window.requestAnimationFrame(() => predict(faceLandmarker));
  };

  useEffect(() => {
    setup(); // 시작 시 캠 설정 및 감지 시작
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <video
        ref={videoRef}
        id="video"
        style={{ width: "1px", height: "1px", opacity: 0 }}
        autoPlay
        muted
      />

      <Canvas
        className="border"
        style={{ height: 240, width: "100%" }}
        camera={{ fov: 30 }}
      >
        <ambientLight intensity={1} />
        <pointLight
          position={[10, 10, 10]}
          color={new Color(1, 1, 0)}
          intensity={1.5}
        />
        <pointLight
          position={[-10, 0, 10]}
          color={new Color(1, 0, 0)}
          intensity={1.5}
        />
        <pointLight position={[0, 0, 10]} intensity={1.2} />
        <Avatar
          url={defaultAvatarUrl}
          blendshapes={blendshapes}
          rotation={rotation}
        />
      </Canvas>
      <div className="text-[14px]">
        Current Expression: {expression} (Score: {expressionScore.toFixed(2)})
      </div>
    </div>
  );
}