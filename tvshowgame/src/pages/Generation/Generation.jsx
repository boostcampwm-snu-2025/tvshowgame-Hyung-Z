import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Play, CheckCircle2 } from 'lucide-react';

const Generation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 이전 페이지에서 넘겨준 노래 목록 받기 (없으면 빈 배열)
  const songs = location.state?.songs || [];

  // --- State ---
  const [isReady, setIsReady] = useState(false); // 준비 완료 여부
  const [progress, setProgress] = useState(0);   // 진행률 (0~100)

  // --- Effect: 10초 타이머 시뮬레이션 ---
  useEffect(() => {
    const totalTime = 10000; // 10초 (ms)
    const intervalTime = 100; // 0.1초마다 업데이트
    const totalSteps = totalTime / intervalTime;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      
      // 진행률 계산 (단순 시각용)
      const percent = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(percent);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsReady(true); // 10초 뒤 준비 완료!
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // --- Handler: 게임 시작 ---
  const handlePlay = () => {
    if (!isReady) return;
    // 게임 페이지로 노래 목록을 들고 이동
    navigate('/game', { state: { songs } });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4">
      
      {/* 1. 중앙 애니메이션 영역 */}
      <div className="flex flex-col items-center mb-16 relative">
        {/* 빙글빙글 돌아가는 스피너 */}
        <div className="relative">
          {isReady ? (
            // 완료 시: 체크 아이콘
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-short">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
          ) : (
            // 로딩 중: 스피너
            <>
              {/* 배경 원 (회색 트랙) */}
              <div className="w-24 h-24 rounded-full border-4 border-gray-100"></div>
              {/* 돌아가는 원 (파란색) */}
              <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              {/* 중앙 아이콘 (선택사항) */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 size={32} className="text-blue-600 animate-spin" />
              </div>
            </>
          )}
        </div>

        {/* 텍스트 메시지 */}
        <h2 className="mt-8 text-2xl font-bold text-gray-800 text-center">
          {isReady ? "준비가 완료되었습니다!" : "AI가 이미지를 생성하고 있습니다..."}
        </h2>
        
        {/* 진행률 텍스트 (나중에 n/10으로 교체 가능) */}
        <p className="mt-2 text-gray-500 font-medium">
          {isReady ? "Ready to Play" : `${Math.floor(progress)}%`}
        </p>

        {/* 팁 메세지 (심심하지 않게) */}
        {!isReady && (
           <p className="mt-4 text-xs text-gray-400 animate-pulse">
             잠시만 기다려주세요. 약 10초 정도 소요됩니다.
           </p>
        )}
      </div>

      {/* 2. 하단 PLAY 버튼 */}
      <div className="w-full max-w-md">
        <button
          onClick={handlePlay}
          disabled={!isReady} // 준비 안되면 비활성화
          className={`
            w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center transition-all duration-300 shadow-lg
            ${isReady 
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/40 hover:-translate-y-1 cursor-pointer' // 활성 스타일
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' // 비활성 스타일
            }
          `}
        >
          {isReady ? (
            <>
              <Play fill="currentColor" className="mr-2" /> GAME START
            </>
          ) : (
            "생성 중..."
          )}
        </button>
      </div>

    </div>
  );
};

export default Generation;