import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useWindowSize() {
    const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
    const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0);

    const updateSize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    onMounted(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateSize);
    });

    return { width, height };
}
