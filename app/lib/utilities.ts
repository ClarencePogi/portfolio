export const scrollToProjects = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    })
}

export const handleGetInTouch = () => {
    const email = "golezchristine31@gmail.com"
    const subject = encodeURIComponent("Inquiry from your portfolio")
    const body = encodeURIComponent("Hi Clarence, I'd like to talk about...")

    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
        "_blank",
        "noopener,noreferrer"
    )
}