import DotField from "@/components/DotField";

export function DotFieldBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="rgba(43, 57, 109, 0.5)"
        gradientTo="rgba(29, 38, 69, 0.3)"
        glowColor="#120F17"
      />
    </div>
  );
}
