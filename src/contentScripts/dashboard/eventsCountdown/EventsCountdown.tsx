/** @jsxImportSource preact */

// @deno-types="preact/types"
import * as preact from "preact";
import { createPortal, useState } from "preact/compat";

/** @param duration 期間の長さ (秒) */
const createDurationText = function (duration: number) {
  if (duration < 60) {
    // 60秒未満
    return `${duration}秒`;
  } else if (duration < 3600) {
    // 60分未満
    return `${Math.floor(duration / 60)}分`;
  } else if (duration < 86400) {
    // 24時間未満
    return `${Math.floor(duration / 3600)}時間`;
  } else {
    return `${Math.floor(duration / 86400)}日`;
  }
};

/** 次に描画を更新すべき時間を返す */
const msUntilNextUpdate = function (duration: number, currentTime: number) {
  /** 更新間隔 (s) */
  let refreshRate = 1;

  if (duration < 60) {
    // 60秒未満; 秒単位で更新
    refreshRate = 1;
  } else if (duration < 3600) {
    // 60分未満; 分単位で更新
    refreshRate = 60;
  } else if (duration < 86400) {
    // 24時間未満; 時間単位で更新
    refreshRate = 3600;
  } else {
    // 24時間以上; 日単位で更新
    refreshRate = 86400;
  }

  const refreshRateMs = refreshRate * 1000;

  return refreshRateMs - currentTime % refreshRateMs;
};

interface CountdownProps {
  expireDate: Date;
  portalTarget: HTMLElement;
}

const Countdown = (props: CountdownProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const duration = Math.floor(
    (props.expireDate.getTime() - currentTime) / 1000,
  );
  setTimeout(
    () => setCurrentTime(Date.now()),
    msUntilNextUpdate(Math.abs(duration), currentTime),
  );

  let className = "";
  if (duration < 0) {
    className = "exceeded text-muted";
  } else if (duration < 86400) {
    className = "imminent red";
  }

  return createPortal(
    (
      <span className={className}>
        {duration >= 0
          ? `残り${createDurationText(duration)}`
          : `${createDurationText(-duration)}前`}
      </span>
    ),
    props.portalTarget,
  );
};

interface EventsCountdownProps {
  items: {
    expireDate: Date;
    portalTarget: HTMLElement;
  }[];
}

const EventsCountdown = (props: EventsCountdownProps) => (
  <>
    {props.items.map((item) => (
      <Countdown
        expireDate={item.expireDate}
        portalTarget={item.portalTarget}
      />
    ))}
  </>
);

const renderEventsCountdown = function (
  props: EventsCountdownProps,
  targetElement: HTMLElement,
) {
  preact.render(
    <EventsCountdown items={props.items} />,
    targetElement,
  );
};

export { renderEventsCountdown };

export type { EventsCountdownProps };
