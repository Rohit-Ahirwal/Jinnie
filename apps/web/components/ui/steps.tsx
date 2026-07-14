type Step = {
    title: string
    description: string
  }
  
  interface StepsProps {
    steps: Step[]
    currentStep?: number
  }
  
  export function Steps({
    steps,
    currentStep = 0,
  }: StepsProps) {
    return (
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative flex gap-4"
          >
            {/* Vertical Line */}
            {index !== steps.length - 1 && (
              <div className="absolute left-5 top-10 h-full w-px bg-border" />
            )}
  
            {/* Circle */}
            <div
              className={`
                z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold
                ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground"
                }
              `}
            >
              {index + 1}
            </div>
  
            {/* Content */}
            <div className="pb-8">
              <h3 className="font-semibold">
                {step.title}
              </h3>
  
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }