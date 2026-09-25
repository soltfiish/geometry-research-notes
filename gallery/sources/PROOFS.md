# Proofs and certificates for GCS-CIRCUIT-COMPATIBILITY-002

## 1. Quantifiers and the verified checkpoint

For a graph $G=(V,E)$, write $d_{ij}(p)=(p_i-p_j)^T(p_i-p_j)$. Over the reals this is squared Euclidean distance; over the complexes the transpose is bilinear, without conjugation. A partition is a map $\chi:E\to\{1,\ldots,c\}$ with all classes nonempty. A coordinated realization satisfies

\[
d_e(q)=\lambda_{\chi(e)}d_e(p),\qquad\lambda_a>0.
\]

Normalize the first scale to one using a global similarity; write the remaining relative scales as $z_2,\ldots,z_c$. Reflections are included in the similarity group. The reference $p$ is generic; the competing realization $q$ is arbitrary. In algebraic assertions, the scales are nonzero complex numbers and $q\in(\mathbb C^2)^V$.

“Generic” means algebraic genericity over $\mathbb Q$, or, for the uniform sufficient statements proved here, membership in a specified nonempty Zariski-open set. For each fixed $n$, there are finitely many partitions and restrictions. Intersecting their open sets gives one nonempty Zariski-open set valid simultaneously for all of them. This does not assert a common real positive branch count on all real sign chambers.

The metric-carrier connectivity theorem and the exact sequence

\[
0\longrightarrow\ker L_p\longrightarrow\ker(A L_p)
\longrightarrow\operatorname{im}L_p\cap\ker A\longrightarrow0
\]

are retained. They give

\[
d_{\rm residual}=d_{\rm flex}+(c-1)-\operatorname{rank}\beta.
\]

Here $L_p$ is the differential of log squared lengths. If stresses instead come from the ordinary unweighted squared-distance rigidity matrix, the pairing is **weighted**:

\[
\beta(\omega)_a=\sum_{e\in C_a}\omega_e d_e(p).
\]

The sum over classes is zero, so this pairing has rank at most $c-1$. EXP001's `stress_recon` computes $\sum_{e\in C_a}\omega_e$ instead. Its `class_stress_projection_rank` is a different quantity. In the preserved three-class control it is 3, whereas the correct weighted rank is 2. The underlying synchronization audit's exact-sequence result is unaffected.

**K4 identity correction.** With the inherited notation $F,P_C,Q_C,r_C$, the full-ring identity is

\[
P_C(\mu)=\mu^{r_C}\big[-2(\mu-1)Q_C(\mu)+F(d)\big].
\]

The prose report omitted $\mu^{r_C}$ on its last term. Its source and JSON use the correct division identity. On $F(d)=0$, the reported factorization and extra degrees $1,1,2,1,2$ are unchanged. The singleton formula, inversion of the triangle orbit, and stress interpretation at the unit root are retained. A nonunit complex root is not automatically a positive Euclidean branch.

The new verifier also checks, in the general coordinate gauge $(0,0),(\ell,0),(x,y),(u,v)$, every identity $\partial F/\partial d_{ij}=-8\alpha_i\alpha_j$ and the singleton identity $A-a^2f=-4a\alpha_0\alpha_1$, with affine cofactors computed directly. The circle-inversion distance identity is verified symbolically as well.

## 2. A strengthened K5 certificate and its restriction corollary

For each of the 17 unordered bipartition orbits, substitute the exact reference

\[
(0,0),(3,0),(4,2),(0,3),(5,5)
\]

into the five $K_4$ Cayley–Menger scale polynomials. The new computation uses unnormalized squared distances; this only multiplies the polynomials by nonzero common constants relative to the inherited normalization.

For every mixed circuit, determine its structural zero power $r$ and its maximum degree $D$ from the **symbolic edge-color pattern before specialization**. Remove $\mu^r(\mu-1)$: the zero factor is universal and the unit factor occurs because the reference is planar. Monochromatic circuits vanish identically and are skipped. The specialized reduced polynomial has degree exactly $D-r-1$ in every recorded case. In particular, a branch cannot have silently escaped to infinity through a degree drop, and no accidentally repeated unit factor has been discarded.

For each orbit, two of the reduced polynomials $a(\mu),b(\mu)$ have nonzero resultant. The JSON records their vertex supports, degrees, exact coefficients, resultant, and rational-polynomial Bézout coefficients $u,v$ with

\[
u(\mu)a(\mu)+v(\mu)b(\mu)=1.
\]

The corresponding resultant before specialization is a polynomial in the reference coordinates, up to harmless powers of nonzero constants. The attained degree bounds mean that the recorded nonzero resultant really is a specialization of that fixed-size Sylvester determinant. It is therefore not identically zero. Away from its vanishing locus there is no common nonunit scale. Only necessary circuit equations are used, so this argument does not need circuit sufficiency.

The 17 representatives and all their vertex permutations and class swaps cover all $2^{10}-2=1022$ nontrivial labelled subsets. This coverage is checked directly. Thus, generically, **every two-class $K_5$ has only the unit relative scale, even over $\mathbb C^*$**.

**Restriction corollary.** Fix $n\ge5$ and choose an edge in each nonempty global class. Their endpoints occupy at most four vertices. Extend them to a five-vertex set. Its induced partition contains both classes and its reference coordinates are generic. Any competing realization restricts with the same relative scale, which the $K_5$ result forces to one. All complete-graph squared distances then agree up to a single scale, so $q$ is similar to $p$. Completeness and reflection allowance are used in this final step.

## 3. The actual scale ideal, circuit equations, and realizability

Let $m_G:(\mathbb C^2)^V\to\mathbb C^E$ be the squared-distance map, $M_G=\overline{\operatorname{im}m_G}$, and $I_G=I(M_G)$. This is a prime ideal. Let $J_G$ be generated by the irreducible algebraic-matroid circuit polynomials. Then

\[
J_G\subseteq I_G.
\]

Each circuit polynomial generates the elimination ideal on its own support. That statement does not imply that their sum generates the full ideal, or even cuts out the full variety set-theoretically. This distinction agrees with the circuit-support theorem and the noncircuit generators discussed by [Malić and Streinu](https://epubs.siam.org/doi/10.1137/21M1437986).

At a fixed reference $p$, work in the Laurent ring

\[
R_p=\mathbb C[z_2^{\pm1},\ldots,z_c^{\pm1}],\qquad z_1=1,
\]

with substitution $\phi_p(x_e)=d_e(p)z_{\chi(e)}$. The full algebraic scale ideal is

\[
I^{\rm full}_{\chi,p}=\langle\phi_p(f):f\in I_G\rangle,
\]

whereas the circuit scale ideal is $J^{\rm circ}_{\chi,p}=\langle\phi_p(f_H)\rangle$. Their zero sets satisfy

\[
\{z:m_G(q)=\phi_p(x)\text{ for some }q\}
\subseteq V(I^{\rm full}_{\chi,p})\subseteq V(J^{\rm circ}_{\chi,p}).
\]

The first inclusion is an equality for a complete graph. For a partial graph, the measurement image can require a completion or a constructible-image test; replacing it by its Zariski closure is not automatically exact at exceptional data.

For $K_n$, form the anchored Gram matrix

\[
B(\delta)_{ij}=\tfrac12(\delta_{0i}+\delta_{0j}-\delta_{ij}),
\quad 1\le i,j\le n-1,\quad\delta_{ii}=0.
\]

The linear map between $\delta$ and symmetric $B$ is invertible. The full measurement ideal is generated by **all** $3\times3$ minors of $B$, including nonprincipal minors. Indeed, rank at most two is equivalent over $\mathbb C$ to a factorization $B=UU^T$ with two columns; placing vertex 0 at the origin gives the desired complex realization. Thus for complete data:

\[
z\text{ is a positive planar Euclidean scale}
\iff z>0,\quad B(\delta(z))\succeq0,\quad\operatorname{rank}B(\delta(z))\le2.
\]

Rank at most two includes possible degenerate competitors. Rank exactly two is appropriate when separately established, rather than silently excluding all lower-rank possibilities.

In a polynomial ring, localization to the scale torus is implemented by saturation by $\prod_{a=2}^c z_a$, or by adjoining $t\prod z_a-1$. This removes zero scale components, not other spurious components. If an anchor block $H$ is inverted for Schur-complement reconstruction, clearing denominators requires localization at $\det H$. Configurations where it vanishes require another chart or the full minors. The reference having a nondegenerate anchor does not ensure every competing scaled metric remains in that chart.

To exclude every nonunit scale, test each open set $z_j\ne1$ separately: prove that

\[
I^{\rm full}_{\chi,p}+\langle t(z_j-1)-1\rangle
\]

is the unit ideal in the Laurent ring with $t$ adjoined, for every $j=2,\ldots,c$. Equivalently, the only torus zero is $\mathbf1$. A certificate using a subset of necessary circuit equations is already sufficient for *exclusion*. Saturating by $\prod_j(z_j-1)$ alone is incorrect for this purpose: it misses alternatives with some scales equal to one, including the inherited $(1,1/8)$ control.

**What a component-selecting saturation can mean.** In characteristic zero, $M_G$ is an irreducible component of $V(J_G)$. Choose a matroid basis of size $r=\dim M_G$. For each nonbasis coordinate, its fundamental circuit polynomial has a nonzero derivative in that coordinate at a generic point of $M_G$, by separability. The resulting $m-r$ Jacobian rows are independent. Since $M_G\subseteq V(J_G)$, the local dimension there is exactly $r$, proving the component claim. There are finitely many other irreducible components. Choosing a polynomial vanishing on each of them but not identically on $M_G$, and taking their product $h$, gives

\[
I_G=(\sqrt{J_G}:h^\infty).
\]

This is an existence statement, not a prescribed coordinate-product saturation or an algorithm already executed here. The polynomial $h$ can vanish at legitimate exceptional measurement points. After substituting a class-scale curve, those loci must be handled separately. The explicit example next proves that ordinary distance and triangle-area localizations do not solve the problem.

## 4. An exact counterexample to sufficiency of every circuit

Set

\[
A=\begin{pmatrix}0&1&1&1\\1&0&1&1\\1&1&0&-5\\1&1&-5&0\end{pmatrix},\qquad
B=A^{-1}=\frac1{45}\begin{pmatrix}-10&35&5&5\\35&-10&5&5\\5&5&2&-7\\5&5&-7&2\end{pmatrix}.
\]

In edge order $01,02,03,04,12,13,14,23,24,34$, its associated distance vector is

\[
\delta=\frac1{45}(-10,-10,2,2,-90,-18,-18,-18,-18,18).
\]

Every coordinate is nonzero, every triangle Gram determinant is nonzero, and $\det B=1/45$. Hence this is not a planar complex measurement.

Nevertheless **all 20 planar $K_5$ circuit polynomials vanish**. The circuit supports are exactly the five $K_4$'s and the fifteen wheels obtained by deleting two disjoint edges. This follows from planar Laman sparsity: a five-vertex circuit has eight edges and minimum degree at least three, so its two omitted edges are disjoint; smaller circuits are $K_4$'s.

The five Cayley–Menger determinants are checked directly. Their vanishing also follows from the zero diagonal and zero total sum of $A=B^{-1}$: the four principal cofactors of $B$ and the remaining affine four-point determinant vanish.

For each of the fifteen wheels, the certificate supplies an actual rank-two **complex Gram completion** of its eight fixed distances. Choose the unshared vertex of the omitted edges as hub, and order the other vertices so the missing pairs are $13,24$, with unknowns $x,y$. The fixed anchor block $H=B_{\{1,2\},\{1,2\}}$ is nonsingular. Solve

\[
B_{\{3,4\},\{3,4\}}-B_{\{3,4\},\{1,2\}}H^{-1}B_{\{1,2\},\{3,4\}}=0.
\]

The JSON gives a proper zero-dimensional Gröbner basis and an explicit algebraic solution for every omitted pair. Substitution yields rank two. Therefore the eight coordinates are in the actual complex measurement image of that wheel, forcing its circuit polynomial to vanish. The fifteen completions need not agree with one another or with the original two missing values; that is precisely the compatibility failure.

For example, with omitted pairs $13,24$ in the original order, a completion basis is

\[
5x+5y-6=0,\qquad25y^2-30y-16=0.
\]

It has solutions $y=8/5,x=-2/5$ and $y=-2/5,x=8/5$. The original vector instead has both missing values $-2/5$, which fails full compatibility.

Thus $V(J_{K_5})\ne M_{K_5}$, even on the open set where all distances and all triangle Gram determinants are nonzero. Taking radicals, or saturating by either product, cannot restore equality on that open set.

**A separate Euclidean obstruction.** Put

\[
\delta_{ij}=(i-j)^2\left(1-\frac{(i+j)^2}{100}\right),\qquad0\le i<j\le4.
\]

Every entry is positive. These distances have a complex planar realization $q_i=(i,\sqrt{-1}\,i^2/10)$, so the full measurement ideal and all circuit equations vanish. The anchored Gram matrix has rank two but its $\{1,2\}$ principal minor is $-1/25$. It is indefinite and admits no real Euclidean realization. This also gives positive scale-coordinate counterexamples to the unrestricted proposed formula by using singleton edge classes through any positive reference vector. The algebraic and Euclidean obstructions are logically different.

## 5. Repairing the inherited three-class control

The preserved control `K5-c3-7` uses

\[
p=((0,0),(2,1),(5,0),(1,4),(6,3)),
\]

with $C_2=\{14\}$, $C_3=\{23\}$, and all other edges in $C_1$. The points $0,1,4$ lie on $y=x/2$. Reflect only vertex 2 across that line:

\[
p_2=(5,0)\longmapsto q_2=(3,4).
\]

All distances except $23$ are unchanged, and $d_{23}$ changes from 32 to 4. Therefore $(\lambda_1,\lambda_2,\lambda_3)=(1,1,1/8)$ is an exact positive Euclidean witness. Its normalized tangent rank is 6, and all ten deletion ranks are 6, as the original artifact reports.

However, this witness lies on a collinearity hypersurface. Replacing $p_4$ by $(6,3+t)$, with $t$ transcendental, gives the exact circuit Gröbner basis

\[
\langle\mu-1,\nu-1\rangle\quad\text{over }\mathbb Q(t).
\]

The same basis is verified at $t=1/100$. For all but finitely many values along this transverse line, the necessary circuit equations already exclude every nonunit scale. Thus the branch does not persist on a neighborhood of the reference. Simplicity of a solution of a specialized, overdetermined scale system does not justify the implicit-function conclusion used for a single $K_4$ equation.

There is a structural explanation. $C_1$ is the wheel $K_5-\{14,23\}$, a three-connected planar rigidity circuit, hence redundantly rigid and generically globally rigid by [Jackson and Jordán](https://webspace.maths.qmul.ac.uk/b.jackson/uniqueRESUBMIT.pdf). Fixing its scale already fixes the generic complete shape. Consequently this particular partition is generically unique. The old report's generic failure claim for coordinated redundancy is not established by this control. It still disproves a version without a generic-reference hypothesis.

Other three-class sample counts remain exact sample records. This session does not promote them to a classification of generic real chambers, and does not rerun their exhaustive census.

## 6. A finite anchor lemma

**Lemma.** Let $a_1,\ldots,a_m,x\in\mathbb R^2$ be generic. The anchors are fixed. Their incident edges to $x$ are partitioned into $k$ unknown scale classes and any number of already calibrated classes with scale one. If $m\ge k+3$, any point $y\in\mathbb R^2$ satisfying those classwise scaled squared distances is $x$, and each unknown incident scale is one. The conclusion also holds over the complex bilinear model with nonzero reference distances.

**Proof.** Write $h=y-x$, $\eta=\|y\|^2-\|x\|^2$, $t_j=\lambda_j-1$, and $r_i=\|x-a_i\|^2\ne0$. Each equation gives

\[
-2a_i\cdot h+\eta=t_{\chi(i)}r_i,
\]

with the right side zero in a calibrated class. This is a homogeneous linear system in $h_1,h_2,\eta,t_1,\ldots,t_k$. It is stronger than a tangent equation: every finite competitor satisfies it exactly. The relation between $\eta$ and $h$ is unnecessary if the linear kernel is zero.

Translate $x$ to zero and put $b_i=a_i/(a_i\cdot a_i)$. Dividing by $r_i$ gives

\[
(-2h_1,-2h_2,\eta)\cdot w_i=t_{\chi(i)},\qquad
w_i=(b_{i1},b_{i2},b_{i1}^2+b_{i2}^2).
\]

Choose a base anchor for each unknown class and subtract its equation from the other equations of that class. Retain all calibrated equations. There are $m-k\ge3$ constraints on the three-vector $(-2h_1,-2h_2,\eta)$: their coefficient vectors are $w_i-w_{b(j)}$ for nonbase unknown-class anchors and $w_i$ for calibrated anchors.

Any chosen three such rows are generically independent. To prove the required determinant is not identically zero, first fix the base anchors, then choose the three nonbase anchors successively. The paraboloid $w=(u,v,u^2+v^2)$, or any translate of it, is not contained in any proper linear subspace of $\mathbb R^3$. Each successive row can therefore be chosen outside the span of its predecessors. Distinctness and nonzero denominators exclude only proper sets and can be preserved. Inversion $a\leftrightarrow b$ is rational on the relevant open set, so the determinant is a nonzero rational function of the original coordinates. It is nonzero generically, over both $\mathbb R$ and $\mathbb C$.

Hence $h=0,\eta=0$, and each original equation implies $t_j=0$. This proves the lemma. The JSON includes five independent exact $5\times5$ determinant examples for two unknown classes, covering several distributions including the highly unbalanced $4+1$ distribution. Those examples check the implementation; the argument above proves all distributions.

## 7. Structural sufficient conditions and a finite threshold

**Circuit merging condition.** On the set of class labels, add an edge between $a,b$ whenever the graph contains a $K_5$ whose edges use exactly those two classes. The $K_5$ circuit certificate forces their scales to agree generically. If this class graph is connected, all scales agree. More generally, repeatedly merge already-proved equal classes and apply the same rule to newly bicolored $K_5$'s. If it ends in one class, the selected circuit equations exclude every nonunit torus scale. For a complete graph, this gives similarity; on a partial graph, ordinary global uniqueness of the shape is a separate requirement.

**Calibrated seed condition.** Suppose a complete subgraph on $m$ vertices has been fixed up to a common similarity by valid scale certificates. Normalize its common scale to one. If each remaining vertex has at least $k_v+3$ neighbors in this fixed set, where $k_v$ is the number of as-yet uncalibrated incident classes, the anchor lemma fixes it. The procedure can be iterated. This is a sufficient condition for actual realizations; the proof does not assert that arbitrary zeros of a circuit ideal admit the required realizations.

Define $P(n,c)$, only when $\binom n2\ge c$, to mean that **every** partition of $E(K_n)$ into exactly $c$ nonempty classes is unique up to common scale and similarity at **every algebraically generic real** reference. Define $N_2(c)$ to be the least admissible $n$ with $P(n,c)$, provided one exists.

There is no vacuous small-$n$ convention. Also $P(n,c)$ implies the corresponding property with at most $c$ classes: refine any such partition to exactly $c$ classes. A solution for the coarser partition is also one for the refinement. Consequently the property propagates to larger complete graphs by restriction to $n$-vertex sets, whose overlaps synchronize their common scales. For $c\ge2$, the potentially relevant $n$'s are at least three; overlapping restrictions sharing an edge suffice. Thus “least number” and “eventual threshold” agree here.

**Finite upper bound.** For $c\ge3$, put $r=\lceil c/2\rceil$ and $m=c+2\ge5$. Group the original colors into $r$ blocks, each containing at most two colors. If

\[
n\ge R_r(m),
\]

the coarsened coloring contains a monochromatic $K_m$. It uses at most two original classes. If it uses one, its distances already have a common scale. If it uses two, Section 2's complete-graph corollary forces those scales to agree. After normalization, this clique is a fixed anchor set. Any outside vertex has $m=c+2$ spokes and at most $c-1$ unknown classes. Thus $m\ge k+3$, and the anchor lemma fixes that vertex. All vertices and all nonempty class scales are fixed. This proves

\[
N_2(c)\le R_{\lceil c/2\rceil}(c+2)<\infty.
\]

The proof actually excludes nonunit **complex realizable** scales generically. The counterexample in Section 4 explains why “realizable” cannot be dropped from a statement about an arbitrary circuit zero.

For completeness, Ramsey finiteness follows by induction on the targets: set $B(k_1,\ldots,k_r)=1$ if one target is 1 and otherwise

\[
B(k_1,\ldots,k_r)=2-r+\sum_{i=1}^r B(k_1,\ldots,k_i-1,\ldots,k_r).
\]

At a vertex of a complete graph of that size, the pigeonhole principle gives a color-$i$ neighborhood of size at least the corresponding smaller bound. Induction either finds a target clique of another color or extends a color-$i$ clique through the chosen vertex. For three original classes, $r=2,m=5$, and the recursion gives $B(5,5)=\binom84=70$. No modern numerical Ramsey estimate is needed.

**Generic lower bound.** For $c\ge2$, take $n=c+2$, keep $n-1=c+1$ generic anchors, and single out one moving point $x$. Put all anchor-to-anchor edges in class 1. Put its spokes to three selected anchors in class 2. Put each of the remaining $c-2$ spokes in its own singleton class. This is exactly $c$ nonempty classes.

Let $O,R$ be the circumcenter and circumradius of the three selected anchors. Replace $x$ by

\[
x'=O+\frac{R^2}{\|x-O\|^2}(x-O).
\]

For each selected anchor $a$,

\[
\|x'-a\|^2=\frac{R^2}{\|x-O\|^2}\|x-a\|^2.
\]

The three-point circumcircle is available at every noncollinear triple; it imposes no nongeneric relation on the reference. For generic real references, $x\ne O$, $x$ is off that circle, and $x'$ differs from every other anchor. The common spoke scale is therefore positive and nonunit. Each singleton spoke receives its own positive distance quotient. The anchor distances remain fixed. Three fixed noncollinear anchors force any similarity fixing them to be the identity, so the two configurations are not similar. This works for algebraically generic references, not merely at the rational illustration.

Thus $P(c+2,c)$ fails; monotonicity excludes all earlier admissible thresholds. Combining the bounds and the $K_5$ theorem gives

\[
\boxed{N_2(2)=5,\qquad6\le N_2(3)\le70,\qquad
c+3\le N_2(c)\le R_{\lceil c/2\rceil}(c+2)\ (c\ge3).}
\]

## 8. What remains unresolved

The sharp three-class question is $N_2(3)=6$. Any three-class $K_6$ with a $K_5$ using at most two colors is already covered: calibrate that seed, then attach the last vertex by the lemma. The remaining patterns have every $K_5$ using all three colors. For example, put $01,23,45$ in one class, $02,14,35$ in a second, and all other edges in the third. Deleting any vertex leaves all three colors present. No uniqueness or ambiguity claim for this specific remaining pattern is made here.

An exact continuation should study the full Gram-minor ideal for such remaining patterns and use valid generic specialization certificates, or discover a geometric obstruction. If additional complex scales occur, positivity and PSD must still be decided before drawing a conclusion about $N_2(3)$. The sharp characterization of generic coordinated redundant rigidity is also open after correction of the inherited control.
