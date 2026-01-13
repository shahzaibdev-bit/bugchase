import React, { useState } from 'react';
import { SubmissionData, STEPS } from './types';
import { StepSidebar } from './StepSidebar';
import { StepClassification } from './StepClassification';
import { StepSeverity } from './StepSeverity';
import { StepDetails } from './StepDetails';
import { StepReview } from './StepReview';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Save, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const SubmissionWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<SubmissionData>({
        target: null,
        assetType: null,
        category: null,
        bugType: null,
        cwe: null,
        severityMode: 'manual',
        severity: 'None',
        cvssVector: { AV: 'N', AC: 'L', PR: 'N', UI: 'N', S: 'U', C: 'N', I: 'N', A: 'N' },
        cvssScore: 0.0,
        title: '',
        vulnerabilityDetails: '',
        validationSteps: '',
        files: [],
        agreedToTerms: false
    });

    const updateData = (updates: Partial<SubmissionData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const canProceed = () => {
        if (currentStep === 1) return data.target && data.category;
        if (currentStep === 2) return data.severity !== 'None';
        if (currentStep === 3) return data.title.length > 2 && data.vulnerabilityDetails.length > 2;
        return true;
    };

    const handleSubmit = () => {
        toast({
            title: "Report Submitted Successfully",
            description: "Your report ID is #RPT-8821. Triagers will review shortly.",
        });
        navigate('/researcher/reports');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto pb-24">
            {/* Left Column: Sidebar (25%) */}
            <div className="lg:col-span-1 hidden lg:block">
                <StepSidebar currentStep={currentStep} />
            </div>

            {/* Right Column: Content (75%) */}
            <div className="lg:col-span-3 space-y-8">
                
                {/* Step Content */}
                <div className="min-h-[500px]">
                    {currentStep === 1 && <StepClassification data={data} updateData={updateData} />}
                    {currentStep === 2 && <StepSeverity data={data} updateData={updateData} />}
                    {currentStep === 3 && <StepDetails data={data} updateData={updateData} />}
                    {currentStep === 4 && <StepReview data={data} updateData={updateData} />}
                </div>

                {/* Navigation Buttons (Sticky Bottom or Inline) */}
                <div className="flex items-center justify-between pt-8 border-t border-zinc-200 dark:border-white/10">
                    <Button 
                        variant="ghost" 
                        onClick={prevStep} 
                        disabled={currentStep === 1}
                        className="text-zinc-500"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-4">
                        {currentStep === 4 && (
                             <Button variant="ghost" className="text-zinc-500">
                                <Save className="w-4 h-4 mr-2" />
                                Save Draft
                            </Button>
                        )}

                        {currentStep < 4 ? (
                             <Button 
                                onClick={nextStep} 
                                disabled={!canProceed()}
                                className="bg-zinc-900 dark:bg-white text-white dark:text-black font-bold px-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                            >
                                Next: {STEPS[currentStep]?.label || 'Review'}
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                             <Button 
                                onClick={handleSubmit} 
                                disabled={!data.agreedToTerms}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Submit Report
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
