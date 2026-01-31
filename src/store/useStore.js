import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Антропометрические данные
      anthropometry: {
        height: null,
        weight: null,
        age: null,
        limbLength: null,
        completed: false
      },
      
      // Результаты тестов
      testResults: {
        reactionTime: null,
        walkingPace: null,
        breathHold: null,
        psychotype: null,
        completed: false
      },
      
      // Расчетные данные
      calculations: {
        traits: null,
        recommendations: null,
        nutrition: null,
        trainingPlan: null
      },
      
      // UI состояние
      currentStep: 0,
      
      // Actions
      setAnthropometry: (data) => set((state) => ({ 
        anthropometry: { ...state.anthropometry, ...data, completed: true }
      })),
      
      setTestResults: (data) => set((state) => ({ 
        testResults: { ...state.testResults, ...data, completed: true }
      })),
      
      setCalculations: (data) => set({ calculations: data }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // Полные данные пользователя
      getUserData: () => {
        const { anthropometry, testResults } = get();
        return {
          ...anthropometry,
          ...testResults
        };
      },
      
      // Сброс состояния
      reset: () => set({
        anthropometry: {
          height: null,
          weight: null,
          age: null,
          limbLength: null,
          completed: false
        },
        testResults: {
          reactionTime: null,
          walkingPace: null,
          breathHold: null,
          psychotype: null,
          completed: false
        },
        calculations: {
          traits: null,
          recommendations: null,
          nutrition: null,
          trainingPlan: null
        },
        currentStep: 0
      })
    }),
    {
      name: 'sport-analyst-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);