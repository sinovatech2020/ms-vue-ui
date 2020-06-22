const LockBackground = {
    methods: {
        prevent (e) {
            e.preventDefault();
        },
        open () {
            document.addEventListener("touchmove", this.prevent, { passive: false });
        },
        close () {
            document.removeEventListener("touchmove", this.prevent, { passive: true });
        }
    },
}

export default LockBackground