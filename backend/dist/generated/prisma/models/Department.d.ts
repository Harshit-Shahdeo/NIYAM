import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DepartmentModel = runtime.Types.Result.DefaultSelection<Prisma.$DepartmentPayload>;
export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null;
    _min: DepartmentMinAggregateOutputType | null;
    _max: DepartmentMaxAggregateOutputType | null;
};
export type DepartmentMinAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    code: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DepartmentMaxAggregateOutputType = {
    id: string | null;
    institutionId: string | null;
    name: string | null;
    code: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DepartmentCountAggregateOutputType = {
    id: number;
    institutionId: number;
    name: number;
    code: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DepartmentMinAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DepartmentMaxAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DepartmentCountAggregateInputType = {
    id?: true;
    institutionId?: true;
    name?: true;
    code?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DepartmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[];
    cursor?: Prisma.DepartmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DepartmentCountAggregateInputType;
    _min?: DepartmentMinAggregateInputType;
    _max?: DepartmentMaxAggregateInputType;
};
export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
    [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDepartment[P]> : Prisma.GetScalarType<T[P], AggregateDepartment[P]>;
};
export type DepartmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithAggregationInput | Prisma.DepartmentOrderByWithAggregationInput[];
    by: Prisma.DepartmentScalarFieldEnum[] | Prisma.DepartmentScalarFieldEnum;
    having?: Prisma.DepartmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DepartmentCountAggregateInputType | true;
    _min?: DepartmentMinAggregateInputType;
    _max?: DepartmentMaxAggregateInputType;
};
export type DepartmentGroupByOutputType = {
    id: string;
    institutionId: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    _count: DepartmentCountAggregateOutputType | null;
    _min: DepartmentMinAggregateOutputType | null;
    _max: DepartmentMaxAggregateOutputType | null;
};
type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DepartmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DepartmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DepartmentGroupByOutputType[P]>;
}>>;
export type DepartmentWhereInput = {
    AND?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[];
    OR?: Prisma.DepartmentWhereInput[];
    NOT?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[];
    id?: Prisma.StringFilter<"Department"> | string;
    institutionId?: Prisma.StringFilter<"Department"> | string;
    name?: Prisma.StringFilter<"Department"> | string;
    code?: Prisma.StringFilter<"Department"> | string;
    createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    users?: Prisma.UserListRelationFilter;
};
export type DepartmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    institution?: Prisma.InstitutionOrderByWithRelationInput;
    users?: Prisma.UserOrderByRelationAggregateInput;
};
export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    institutionId_code?: Prisma.DepartmentInstitutionIdCodeCompoundUniqueInput;
    AND?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[];
    OR?: Prisma.DepartmentWhereInput[];
    NOT?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[];
    institutionId?: Prisma.StringFilter<"Department"> | string;
    name?: Prisma.StringFilter<"Department"> | string;
    code?: Prisma.StringFilter<"Department"> | string;
    createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
    institution?: Prisma.XOR<Prisma.InstitutionScalarRelationFilter, Prisma.InstitutionWhereInput>;
    users?: Prisma.UserListRelationFilter;
}, "id" | "institutionId_code">;
export type DepartmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DepartmentCountOrderByAggregateInput;
    _max?: Prisma.DepartmentMaxOrderByAggregateInput;
    _min?: Prisma.DepartmentMinOrderByAggregateInput;
};
export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.DepartmentScalarWhereWithAggregatesInput | Prisma.DepartmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.DepartmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DepartmentScalarWhereWithAggregatesInput | Prisma.DepartmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Department"> | string;
    institutionId?: Prisma.StringWithAggregatesFilter<"Department"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Department"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Department"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Department"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Department"> | Date | string;
};
export type DepartmentCreateInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutDepartmentsInput;
    users?: Prisma.UserCreateNestedManyWithoutDepartmentInput;
};
export type DepartmentUncheckedCreateInput = {
    id?: string;
    institutionId: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutDepartmentInput;
};
export type DepartmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutDepartmentsNestedInput;
    users?: Prisma.UserUpdateManyWithoutDepartmentNestedInput;
};
export type DepartmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutDepartmentNestedInput;
};
export type DepartmentCreateManyInput = {
    id?: string;
    institutionId: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DepartmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DepartmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DepartmentListRelationFilter = {
    every?: Prisma.DepartmentWhereInput;
    some?: Prisma.DepartmentWhereInput;
    none?: Prisma.DepartmentWhereInput;
};
export type DepartmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DepartmentInstitutionIdCodeCompoundUniqueInput = {
    institutionId: string;
    code: string;
};
export type DepartmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DepartmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DepartmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    institutionId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DepartmentNullableScalarRelationFilter = {
    is?: Prisma.DepartmentWhereInput | null;
    isNot?: Prisma.DepartmentWhereInput | null;
};
export type DepartmentCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput> | Prisma.DepartmentCreateWithoutInstitutionInput[] | Prisma.DepartmentUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutInstitutionInput | Prisma.DepartmentCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.DepartmentCreateManyInstitutionInputEnvelope;
    connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
};
export type DepartmentUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput> | Prisma.DepartmentCreateWithoutInstitutionInput[] | Prisma.DepartmentUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutInstitutionInput | Prisma.DepartmentCreateOrConnectWithoutInstitutionInput[];
    createMany?: Prisma.DepartmentCreateManyInstitutionInputEnvelope;
    connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
};
export type DepartmentUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput> | Prisma.DepartmentCreateWithoutInstitutionInput[] | Prisma.DepartmentUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutInstitutionInput | Prisma.DepartmentCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.DepartmentUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.DepartmentUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.DepartmentCreateManyInstitutionInputEnvelope;
    set?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    disconnect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    delete?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    update?: Prisma.DepartmentUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.DepartmentUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.DepartmentUpdateManyWithWhereWithoutInstitutionInput | Prisma.DepartmentUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[];
};
export type DepartmentUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput> | Prisma.DepartmentCreateWithoutInstitutionInput[] | Prisma.DepartmentUncheckedCreateWithoutInstitutionInput[];
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutInstitutionInput | Prisma.DepartmentCreateOrConnectWithoutInstitutionInput[];
    upsert?: Prisma.DepartmentUpsertWithWhereUniqueWithoutInstitutionInput | Prisma.DepartmentUpsertWithWhereUniqueWithoutInstitutionInput[];
    createMany?: Prisma.DepartmentCreateManyInstitutionInputEnvelope;
    set?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    disconnect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    delete?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[];
    update?: Prisma.DepartmentUpdateWithWhereUniqueWithoutInstitutionInput | Prisma.DepartmentUpdateWithWhereUniqueWithoutInstitutionInput[];
    updateMany?: Prisma.DepartmentUpdateManyWithWhereWithoutInstitutionInput | Prisma.DepartmentUpdateManyWithWhereWithoutInstitutionInput[];
    deleteMany?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[];
};
export type DepartmentCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutUsersInput, Prisma.DepartmentUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutUsersInput;
    connect?: Prisma.DepartmentWhereUniqueInput;
};
export type DepartmentUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.DepartmentCreateWithoutUsersInput, Prisma.DepartmentUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.DepartmentUpsertWithoutUsersInput;
    disconnect?: Prisma.DepartmentWhereInput | boolean;
    delete?: Prisma.DepartmentWhereInput | boolean;
    connect?: Prisma.DepartmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DepartmentUpdateToOneWithWhereWithoutUsersInput, Prisma.DepartmentUpdateWithoutUsersInput>, Prisma.DepartmentUncheckedUpdateWithoutUsersInput>;
};
export type DepartmentCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutDepartmentInput;
};
export type DepartmentUncheckedCreateWithoutInstitutionInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutDepartmentInput;
};
export type DepartmentCreateOrConnectWithoutInstitutionInput = {
    where: Prisma.DepartmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput>;
};
export type DepartmentCreateManyInstitutionInputEnvelope = {
    data: Prisma.DepartmentCreateManyInstitutionInput | Prisma.DepartmentCreateManyInstitutionInput[];
    skipDuplicates?: boolean;
};
export type DepartmentUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.DepartmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DepartmentUpdateWithoutInstitutionInput, Prisma.DepartmentUncheckedUpdateWithoutInstitutionInput>;
    create: Prisma.XOR<Prisma.DepartmentCreateWithoutInstitutionInput, Prisma.DepartmentUncheckedCreateWithoutInstitutionInput>;
};
export type DepartmentUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: Prisma.DepartmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DepartmentUpdateWithoutInstitutionInput, Prisma.DepartmentUncheckedUpdateWithoutInstitutionInput>;
};
export type DepartmentUpdateManyWithWhereWithoutInstitutionInput = {
    where: Prisma.DepartmentScalarWhereInput;
    data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyWithoutInstitutionInput>;
};
export type DepartmentScalarWhereInput = {
    AND?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[];
    OR?: Prisma.DepartmentScalarWhereInput[];
    NOT?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[];
    id?: Prisma.StringFilter<"Department"> | string;
    institutionId?: Prisma.StringFilter<"Department"> | string;
    name?: Prisma.StringFilter<"Department"> | string;
    code?: Prisma.StringFilter<"Department"> | string;
    createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string;
};
export type DepartmentCreateWithoutUsersInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    institution: Prisma.InstitutionCreateNestedOneWithoutDepartmentsInput;
};
export type DepartmentUncheckedCreateWithoutUsersInput = {
    id?: string;
    institutionId: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DepartmentCreateOrConnectWithoutUsersInput = {
    where: Prisma.DepartmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DepartmentCreateWithoutUsersInput, Prisma.DepartmentUncheckedCreateWithoutUsersInput>;
};
export type DepartmentUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.DepartmentUpdateWithoutUsersInput, Prisma.DepartmentUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.DepartmentCreateWithoutUsersInput, Prisma.DepartmentUncheckedCreateWithoutUsersInput>;
    where?: Prisma.DepartmentWhereInput;
};
export type DepartmentUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.DepartmentWhereInput;
    data: Prisma.XOR<Prisma.DepartmentUpdateWithoutUsersInput, Prisma.DepartmentUncheckedUpdateWithoutUsersInput>;
};
export type DepartmentUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    institution?: Prisma.InstitutionUpdateOneRequiredWithoutDepartmentsNestedInput;
};
export type DepartmentUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    institutionId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DepartmentCreateManyInstitutionInput = {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DepartmentUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutDepartmentNestedInput;
};
export type DepartmentUncheckedUpdateWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutDepartmentNestedInput;
};
export type DepartmentUncheckedUpdateManyWithoutInstitutionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DepartmentCountOutputType = {
    users: number;
};
export type DepartmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | DepartmentCountOutputTypeCountUsersArgs;
};
export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentCountOutputTypeSelect<ExtArgs> | null;
};
export type DepartmentCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type DepartmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.Department$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.DepartmentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["department"]>;
export type DepartmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["department"]>;
export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["department"]>;
export type DepartmentSelectScalar = {
    id?: boolean;
    institutionId?: boolean;
    name?: boolean;
    code?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DepartmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "institutionId" | "name" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["department"]>;
export type DepartmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
    users?: boolean | Prisma.Department$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.DepartmentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    institution?: boolean | Prisma.InstitutionDefaultArgs<ExtArgs>;
};
export type $DepartmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Department";
    objects: {
        institution: Prisma.$InstitutionPayload<ExtArgs>;
        users: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        institutionId: string;
        name: string;
        code: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["department"]>;
    composites: {};
};
export type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DepartmentPayload, S>;
export type DepartmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DepartmentCountAggregateInputType | true;
};
export interface DepartmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Department'];
        meta: {
            name: 'Department';
        };
    };
    findUnique<T extends DepartmentFindUniqueArgs>(args: Prisma.SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DepartmentFindFirstArgs>(args?: Prisma.SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DepartmentFindManyArgs>(args?: Prisma.SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DepartmentCreateArgs>(args: Prisma.SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DepartmentCreateManyArgs>(args?: Prisma.SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DepartmentDeleteArgs>(args: Prisma.SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DepartmentUpdateArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DepartmentUpdateManyArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DepartmentUpsertArgs>(args: Prisma.SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DepartmentCountArgs>(args?: Prisma.Subset<T, DepartmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DepartmentCountAggregateOutputType> : number>;
    aggregate<T extends DepartmentAggregateArgs>(args: Prisma.Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>;
    groupBy<T extends DepartmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DepartmentGroupByArgs['orderBy'];
    } : {
        orderBy?: DepartmentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DepartmentFieldRefs;
}
export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    institution<T extends Prisma.InstitutionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstitutionDefaultArgs<ExtArgs>>): Prisma.Prisma__InstitutionClient<runtime.Types.Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    users<T extends Prisma.Department$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Department$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DepartmentFieldRefs {
    readonly id: Prisma.FieldRef<"Department", 'String'>;
    readonly institutionId: Prisma.FieldRef<"Department", 'String'>;
    readonly name: Prisma.FieldRef<"Department", 'String'>;
    readonly code: Prisma.FieldRef<"Department", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Department", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Department", 'DateTime'>;
}
export type DepartmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where: Prisma.DepartmentWhereUniqueInput;
};
export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where: Prisma.DepartmentWhereUniqueInput;
};
export type DepartmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[];
    cursor?: Prisma.DepartmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[];
};
export type DepartmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[];
    cursor?: Prisma.DepartmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[];
};
export type DepartmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[];
    cursor?: Prisma.DepartmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[];
};
export type DepartmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DepartmentCreateInput, Prisma.DepartmentUncheckedCreateInput>;
};
export type DepartmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DepartmentCreateManyInput | Prisma.DepartmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DepartmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    data: Prisma.DepartmentCreateManyInput | Prisma.DepartmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DepartmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DepartmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DepartmentUpdateInput, Prisma.DepartmentUncheckedUpdateInput>;
    where: Prisma.DepartmentWhereUniqueInput;
};
export type DepartmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyInput>;
    where?: Prisma.DepartmentWhereInput;
    limit?: number;
};
export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyInput>;
    where?: Prisma.DepartmentWhereInput;
    limit?: number;
    include?: Prisma.DepartmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DepartmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where: Prisma.DepartmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DepartmentCreateInput, Prisma.DepartmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DepartmentUpdateInput, Prisma.DepartmentUncheckedUpdateInput>;
};
export type DepartmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where: Prisma.DepartmentWhereUniqueInput;
};
export type DepartmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput;
    limit?: number;
};
export type Department$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type DepartmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
};
export {};
