import { useEffect, useRef, useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import type { SongDetail } from '../types'

interface MiniPlayerProps {
  song: SongDetail | null
  isPlaying: boolean
  onTogglePlay: () => void
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function MiniPlayer({
  song,
  isPlaying,
  onTogglePlay,
  onClose,
  onNext,
  onPrev,
}: MiniPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [duration, setDuration] = useState(0)
  const [playbackError, setPlaybackError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0)
      setDuration(song?.durationSeconds ?? 0)
      setPlaybackError(null)
    }, 0)
    return () => clearTimeout(timer)
  }, [song?.durationSeconds, song?.id])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !song) return

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise) {
        playPromise.catch((error) => {
          console.error('Audio playback failed:', error)
          setPlaybackError('Khong the phat file audio nay')
          onTogglePlay()
        })
      }
      return
    }

    audio.pause()
  }, [isPlaying, onTogglePlay, song])

  if (!song) return null

  const artistName = song.artist?.name ?? 'Không rõ nghệ sĩ'
  const coverUrl = song.coverUrl

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    return `${mins}:${s.toString().padStart(2, '0')}`
  }

  const effectiveDuration = duration || song.durationSeconds
  const percentage = effectiveDuration > 0 ? (progress / effectiveDuration) * 100 : 0

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!effectiveDuration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickPercentage = clickX / width
    const newProgress = Math.max(0, Math.min(clickPercentage * effectiveDuration, effectiveDuration))
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress
    }
    setProgress(Math.floor(newProgress))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-950/95 border-t border-zinc-900 backdrop-blur-xl z-50 flex items-center justify-between px-8 text-white select-none">
      <audio
        ref={audioRef}
        src={song.audioUrl}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration
          if (Number.isFinite(nextDuration)) {
            setDuration(Math.floor(nextDuration))
          }
        }}
        onTimeUpdate={(event) => setProgress(Math.floor(event.currentTarget.currentTime))}
        onEnded={() => {
          setProgress(0)
          if (onNext) {
            onNext()
          }
        }}
        onError={() => setPlaybackError('Khong the tai file audio')}
      />

      {/* 1. Left Section: Track Details & Rotating Cover Art */}
      <div className="flex items-center space-x-3.5 w-1/4 min-w-[200px]">
        <div
          className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-zinc-800 shadow-lg bg-zinc-900 transition-transform duration-1000 ${
            isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
          }`}
        >
          {coverUrl ? (
            <img src={coverUrl} alt={song.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <SpeakerWaveIcon className="h-5 w-5 text-zinc-500" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-zinc-100 truncate hover:text-red-400 cursor-pointer transition-colors duration-200">
            {song.title}
          </h3>
          <p className="truncate text-xs text-zinc-400 font-semibold mt-0.5">{artistName}</p>
          {playbackError ? (
            <p className="truncate text-[10px] font-semibold text-red-400 mt-0.5">{playbackError}</p>
          ) : null}
        </div>
      </div>

      {/* 2. Middle Section: Playback Controls & Progress Bar */}
      <div className="flex flex-col items-center flex-1 max-w-xl px-4">
        {/* Controls */}
        <div className="flex items-center space-x-5 mb-1.5">
          <button
            type="button"
            onClick={onPrev}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
            title="Bài trước"
          >
            <BackwardIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="h-9 w-9 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center shadow transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title={isPlaying ? 'Tạm dừng' : 'Phát'}
          >
            {isPlaying ? (
              <PauseIcon className="h-4.5 w-4.5 fill-current" />
            ) : (
              <PlayIcon className="h-4.5 w-4.5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onNext}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
            title="Bài tiếp theo"
          >
            <ForwardIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar slider */}
        <div className="flex items-center space-x-2.5 w-full text-[10px] font-bold text-zinc-500">
          <span>{formatTime(progress)}</span>
          <div
            onClick={handleProgressBarClick}
            className="flex-1 h-1 bg-zinc-800 rounded-full cursor-pointer relative overflow-hidden group py-0.5"
          >
            <div className="absolute inset-y-0 left-0 bg-zinc-800 rounded-full w-full h-1" />
            <div
              style={{ width: `${percentage}%` }}
              className="absolute inset-y-0 left-0 bg-green-500 rounded-full h-1 group-hover:bg-green-400 transition-all duration-150"
            />
          </div>
          <span>{formatTime(effectiveDuration)}</span>
        </div>
      </div>

      {/* 3. Right Section: Volume Slider & Close Player */}
      <div className="flex items-center justify-end space-x-4 w-1/4 min-w-[200px]">
        {/* Volume controls */}
        <div className="flex items-center space-x-2 group/volume">
          <SpeakerWaveIcon className="h-4.5 w-4.5 text-zinc-400 group-hover/volume:text-zinc-200 transition-colors" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-green-500 focus:outline-none transition-all"
            style={{
              background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume}%, #27272a ${volume}%, #27272a 100%)`,
            }}
          />
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-px bg-zinc-800/80" />

        {/* Close Player button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800/60 transition-all duration-150 cursor-pointer"
          title="Đóng trình phát"
        >
          <XMarkIcon className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )
}
