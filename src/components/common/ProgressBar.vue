<style lang="less">
    .progress-bar {
        padding: 20/100rem 0;width: 530/100rem;margin: auto;
        &-inner {
            position: relative;width: 100%;height: 4/100rem;background: rgba(255,255,255, .2);border-radius: 2px;
        
        }	
         &-ballwrap {
            position: absolute;left: 0;top: 50%;margin-top: -28/100rem;width: 56/100rem;height: 56/100rem;
        }
        &-ball {
			position: absolute;left: 0;top: 0;bottom: 0;margin: auto;
			width: 28/100rem;height: 28/100rem;background: #d33a31;border-radius: 100px;
        }
        &-line, &-buffer {position: absolute;width: 0;height: 100%;border-radius: 2px;}
        &-line {background: #d33a31;}
        &-buffer {background: rgba(255,255,255, .3);z-index: -1;}
    }
</style>

<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="progress-bar-inner">
            <div class="progress-bar-ballwrap"
                ref="progressBtn"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd">
                <p class="progress-bar-ball"></p>
            </div>
            <p class="progress-bar-line" ref="progress"></p>
            <p class="progress-bar-buffer" :style="{'width': `${buffer}%`}"></p>
        </div>
	</div>
</template>

<script>
export default {
    name: 'progressBar',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        buffer: {
            type: Number,
            default: 0
        },
    },
    data () {
        return {
            progressBtnWidth: 0,
            touch: {}
        }
    },
    mounted () {
        this.progressBtnWidth = this.$refs.progressBtn.querySelector('.progress-bar-ball').clientWidth;
    },
    methods: {
        progressTouchStart (e) {
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove (e) {
          if (!this.touch.initiated) {
            return
          }
          const deltaX = e.touches[0].pageX - this.touch.startX
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - this.progressBtnWidth, Math.max(0, this.touch.left + deltaX))
          this._offset(offsetWidth)
          this.$emit('percentChanging', this._getPercent())
        },
        progressTouchEnd () {
          this.touch.initiated = false
          this._triggerPercent()
        },
        progressClick (e) {
          const rect = this.$refs.progressBar.getBoundingClientRect()
          // (progressBtnWidth / 2) 修复点击不精确的 bug！
          const offsetWidth = e.pageX - rect.left - (this.progressBtnWidth / 2)
          this._offset(offsetWidth)
          // 当点击 progressBtn 的时候，e.offsetX 获取不对
          // this._offset(e.offsetX)
          this._triggerPercent()
        },
        /**
         * 设置偏移
         * @param percent
         */
        setProgressOffset (percent) {
          if (percent >= 0 && !this.touch.initiated) {
            const barWidth = this.$refs.progressBar.clientWidth - this.progressBtnWidth
            const offsetWidth = percent * barWidth
            this._offset(offsetWidth)
          }
        },
        /**
         * 派发进度改变事件
         * @private
         */
        _triggerPercent () {
          this.$emit('percentChange', this._getPercent())
        },
        _offset (offsetWidth) {
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style.left = `${offsetWidth}px`
        },
        _getPercent () {
            const barWidth = this.$refs.progressBar.clientWidth - this.progressBtnWidth
            return this.$refs.progress.clientWidth / barWidth
        }
    },
    watch: {
        percent (newPercent) {
            this.setProgressOffset(newPercent)
        }
    }
}
</script>
