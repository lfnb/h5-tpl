import { Application, Loader, Container, Sprite, AnimatedSprite } from "pixi.js";
import { TimelineMax, TweenMax } from "gsap";
import PhyTouch from "phy-touch";
import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames/bind";

import { resource, container, sprites, animations, animatedSprites } from "./assetMap";

import styles from "./index.less";
// const bgSong = require('../../assets/audio/bgSong.mp3');

const composeclass = classnames.bind(styles);

const cw = document.body.clientWidth;
const ch = document.body.clientHeight;
const min = cw < ch ? cw : ch;
const scale = min / 750;

console.log("cw", cw);
console.log("scale", scale);

const loader = Loader.shared;

loader.add(resource).load();

const timeline = new TimelineMax({
	paused: true,
});

const app = new Application({
	width: cw,
	height: ch,
	autoResize: true,
	resolution: 2,
	backgroundColor: 0xfcdaa2,
});

const pages = [];
const spritesObj = [];
const frameAnimation = [];
const videoMap = {
	dialog2: ["./assets/video/1.mp4", "./assets/video/2.mp4", "./assets/video/3.mp4"],
	dialog3: ["./assets/video/1.mp4", "./assets/video/2.mp4", "./assets/video/3.mp4"],
	dialog4: ["./assets/video/1.mp4", "./assets/video/2.mp4", "./assets/video/3.mp4"],
	dialog5: ["./assets/video/1.mp4", "./assets/video/2.mp4", "./assets/video/3.mp4"],
	dialog6: ["./assets/video/1.mp4", "./assets/video/2.mp4", "./assets/video/3.mp4"],
};

window.addEventListener(
	"onorientationchange" in window ? "orientationchange" : "resize",
	function () {
		if (window.orientation === 180 || window.orientation === 0) {
			window.location.reload();
		}
		if (window.orientation === 90 || window.orientation === -90) {
			window.location.reload();
		}
	},
	false
);

export default () => {
	const [percent, setPercent] = useState(0);
	const [vidoeSrc, setVideoSrc] = useState("");
	const [videoIndex, setVideoIndex] = useState(0);
	const [showVideoBtnPlay, setShowVideoBtnPlay] = useState(false);
	const [isShowDialog, setIsShowDialog] = useState(false);
	const [isAutoVideoPlay, seIsAutoVideoPlay] = useState(false);
	const bgSongRef = useRef();
	const tvRef = useRef();

	const spriteEvents = {
		dialog2: () => {
			bgSongRef.current.pause();
			const videoSrc = videoMap.dialog2[0];
			setVideoSrc(videoSrc);
			setIsShowDialog(true);
			seIsAutoVideoPlay(true);
			tvRef.current.play();
		},
		dialog3: () => {
			bgSongRef.current.pause();
			const videoSrc = videoMap.dialog3[0];
			setVideoSrc(videoSrc);
			setIsShowDialog(true);
			seIsAutoVideoPlay(true);
			tvRef.current.play();
		},
		dialog4: () => {
			bgSongRef.current.pause();
			const videoSrc = videoMap.dialog4[0];
			setVideoSrc(videoSrc);
			setIsShowDialog(true);
			seIsAutoVideoPlay(true);
			tvRef.current.play();
		},
		dialog5: () => {
			bgSongRef.current.pause();
			const videoSrc = videoMap.dialog5[0];
			setVideoSrc(videoSrc);
			setIsShowDialog(true);
			seIsAutoVideoPlay(true);
			tvRef.current.play();
		},
		dialog6: () => {
			bgSongRef.current.pause();
			const videoSrc = videoMap.dialog6[0];
			setVideoSrc(videoSrc);
			setIsShowDialog(true);
			seIsAutoVideoPlay(true);
			tvRef.current.play();
		},
		s_7_qrcode: () => {
			console.log('sss');
		},
	};

	// eslint-disable-next-line no-unused-vars
	const initContainer = () => {
		container.forEach((item) => {
			const box = new Container();
			box.width = item.width;
			box.height = item.height;
			box.x = item.x;
			box.y = item.y;
			box.sortableChildren = true;
			app.stage.addChild(box);
			pages.push(box);
		});
	};
	const initSprites = () => {
		sprites.forEach((item) => {
			const spr = new Sprite(loader.resources[item.name].texture);
			spr.width = item.width;
			spr.height = item.height;
			spr.x = item.x;
			spr.y = item.y;
			if (item.anchor) {
				spr.anchor.x = item.anchor.x;
				spr.anchor.y = item.anchor.y;
			}
			if (item.zIndex) {
				spr.zIndex = item.zIndex;
			}
			if (item.interactive) {
				spr.interactive = item.interactive;
				spr.on(item.events.name, () => {
					item.events.fn(spriteEvents[item.name]);
				});
			}
			if (item.alpha === 0 || item.alpha === 1) spr.alpha = item.alpha;
			if (item.scale) {
				spr.anchor.x = 0.5;
				spr.anchor.y = 0.5;
				spr.scale.set(item.scale.x, item.scale.y);
			}

			pages[item.index].addChild(spr);
			spritesObj[item.name] = spr;
		});
	};
	const initAnimatedSprites = () => {
		animatedSprites.forEach((item) => {
			const arrTextture = [];
			item.frames.forEach((frame) => {
				arrTextture.push(loader.resources[frame.name].texture);
			});
			const spr = new AnimatedSprite(arrTextture);
			spr.width = item.width;
			spr.height = item.height;
			spr.x = item.x;
			spr.y = item.y;
			if (item.zIndex) {
				spr.zIndex = item.zIndex;
			}
			if (item.interactive) {
				spr.interactive = item.interactive;
				spr.on(item.events.name, () => {
					item.events.fn(spriteEvents[item.name]);
				});
			}
			if (item.alpha === 0 || item.alpha === 1) spr.alpha = item.alpha;

			pages[item.index].addChild(spr);
			spritesObj[item.name] = spr;
			spr.animationSpeed = 0.4;
			spr.play();
		});
	};

	const frameSpriteAnimation = (progress) => {
		frameAnimation.forEach((item) => {
			const frameProgress = (progress - item.delay) / item.duration;
			const index = Math.floor(frameProgress * item.frames.length);
			if (index < item.frames.length && index >= 0) {
				const frame = item.frames[index];
				spritesObj[item.name].texture = loader.resources[frame.name].texture;
			}
		});
	};

	const initAnimation = () => {
		Object.keys(animations).forEach((key) => {
			const item = animations[key];

			if (item.prop === "delay") {
				TweenMax.delayedCall(item.delay, function () {
					new TweenMax(spritesObj[key], item.duration, item.option);
				});
			} else if (item.prop === "auto") {
				new TweenMax(spritesObj[key], item.duration, item.option);
			} else {
				const action = TweenMax[item.prop](spritesObj[key], item.duration, item.option);
				const tmpline = new TimelineMax({ delay: item.delay });
				if (item.scale && item.auto) {
					TweenMax.to(spritesObj[key].scale, item.scale.duration, item.scale);
				} else if (item.scale) {
					tmpline[item.prop](spritesObj[key].scale, item.duration, item.scale);
				}

				if (item.frames) {
					frameAnimation.push(item);
				}

				tmpline.add(action, 0);
				tmpline.play();
				timeline.add(tmpline, 0);
			}
		});
	};
	const initTouch = () => {
		const max = cw > ch ? cw : ch;
		const n = app.stage.width * scale - max;
		const target = cw > ch ? { x: 0 } : { y: 0 };
		const property = cw > ch ? "x" : "y";

		if (cw < ch) {
			app.stage.rotation = 1.5708;
			app.stage.pivot.set(0.5);
			app.stage.x = cw;
		}
		new PhyTouch({
			touch: "body",
			vertical: !(cw > ch),
			target,
			property,
			min: -n,
			maxSpeed: 1,
			max: 0,
			bindSelf: false,
			initialValue: 0,
			change(value) {
				let step = -(app.stage.position[property] = value) / n;
				step = step < 0 ? 0 : step;
				step = step > 1 ? 1 : step;
				timeline.seek(step);
				frameSpriteAnimation(step);
			},
		});
	};

	useEffect(() => {
		console.log("window.orientation", window.orientation);

		loader.onComplete.once(() => {
			document.getElementById("preLoadPage").style.display = "none";

			if (typeof WeixinJSBridge === "object" && typeof WeixinJSBridge.invoke === "function") {
				WeixinJSBridge.invoke("getNetworkType", {}, function () {
					bgSongRef.current.play();
				});
			} else {
				bgSongRef.current.play();
			}

			initContainer();
			initSprites();
			initAnimatedSprites();
			initAnimation();
			initTouch();

			document.body.appendChild(app.view);
			app.stage.scale.set(scale, scale);
			const videoSrc = videoMap.dialog2[videoIndex];
			setVideoSrc(videoSrc);
			tvRef.current.addEventListener("ended", () => {
				setShowVideoBtnPlay(true);
			});
			tvRef.current.addEventListener("playing", () => {
				setShowVideoBtnPlay(false);
			});
		});

		loader.onProgress.add((l) => {
			setPercent(parseInt(l.progress, 10));
		});
	}, []);

	const handleSontClick = () => {
		if (bgSongRef.current.paused) {
			bgSongRef.current.play();
		} else {
			bgSongRef.current.pause();
		}
	};

	const handleVideoPlay = () => {
		tvRef.current.play();
	};

	const handleVideoPrev = () => {
		if (videoIndex <= 0) {
			return false;
		}
		const index = videoIndex - 1;
		const videoSrc = videoMap.dialog2[index];
		setVideoIndex(index);
		setVideoSrc(videoSrc);
	};

	const handleVideoNext = () => {
		if (videoIndex >= 2) {
			return false;
		}
		const index = videoIndex + 1;
		const videoSrc = videoMap.dialog2[index];
		setVideoIndex(index);
		setVideoSrc(videoSrc);
	};

	const handleVidekClose = () => {
		setIsShowDialog(false);
		setVideoIndex(0);
		setVideoSrc("");
	};

	const filterTvBtn = () => {
		if (videoIndex <= 0) {
			return (
				<>
					<div className={styles.btnPrevNone} />
					<div className={styles.btnNext} onClick={handleVideoNext} />
				</>
			);
		}
		if (videoIndex >= 2) {
			return (
				<>
					<div className={styles.btnPrev} onClick={handleVideoPrev} />
					<div className={styles.btnNextNone} />
				</>
			);
		}
		return (
			<>
				<div className={styles.btnPrev} onClick={handleVideoPrev} />
				<div className={styles.btnNext} onClick={handleVideoNext} />
			</>
		);
	};

	return (
		<div className={styles.activePage}>
			<audio ref={bgSongRef} preload="auto" src="./assets/audio/bgSong.mp3" id="bgSong" loop="loop">
				<track default kind="captions" lang="zh" />
			</audio>
			<div className={styles.btnPlay} id="btnPlay" onClick={handleSontClick} />
			<div id="preLoadPage" className={styles.bg}>
				<div className={styles.gooseLeft} />
				<div className={styles.gooseRight} />
				<div className={styles.leftCloud} />
				<div className={styles.rightCloud} />
				<p className={styles.tip}>
					横屏浏览
					<br />
					体验更佳哦
				</p>
				<div id="percent" className={styles.loading}>
					{percent}%
				</div>
			</div>
			<div
				className={composeclass({
					videoDialog: true,
					showDialog: isShowDialog,
				})}
			>
				<div className={styles.overlay} />
				<div className={styles.box}>
					<div className={styles.tv}>
						<video
							className={composeclass({
								videoControl: true,
								tvRotate: window.orientation === 0,
							})}
							autoPlay={isAutoVideoPlay}
							webkit-playsinline="true"
							playsInline
							ref={tvRef}
							width="293"
							height="178"
							src={vidoeSrc}
						>
							<track default kind="captions" lang="zh" />
						</video>
						<div
							className={composeclass({
								tvBg: true,
								tvRotate: window.orientation === 0,
							})}
						>
							{showVideoBtnPlay ? <div className={styles.btnVideoPlay} onClick={handleVideoPlay} /> : ""}
							{filterTvBtn()}
						</div>
					</div>
					<div
						className={composeclass({
							btnClose: true,
							btnRotate: window.orientation === 0,
						})}
						onClick={handleVidekClose}
					/>
				</div>
			</div>
		</div>
	);
};
